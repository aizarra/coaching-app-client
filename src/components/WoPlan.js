import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const API_URL = 'http://localhost:5005';

const WoPlan = () => {
  const [exercises, setExercises] = useState([]);
  const [email, setEmail] = useState('');
  const [chosenExercises, setChosenExercises] = useState([]);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmission = (e) => {
    e.preventDefault();
    const requestBody = { email, chosenExercises };

    axios
      .post(`${API_URL}/api/user/chosenExercises`, requestBody)
      .then((response) => {
        navigate('/PlanForClient');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleCheckBox = (e) => {
  //   const { value } = e.target;
  //   if (chosenExercises.includes(value)) {
  //     const index = chosenExercises.indexOf(value);
  //     const copyArr = [...chosenExercises];
  //     copyArr.splice(index, 1);
  //     setChosenExercises(copyArr);
  //   } else {
  //     setChosenExercises([...chosenExercises, value]);
  //   }
  // };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/exercises`)
      .then((response) => {
        console.log(response.data);
        setExercises(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  exercises && console.log('WORKOUT', exercises.workouts);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 4,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="default"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 20,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'gifUrl',
      key: '',
      width: '30%',
      render: (gifUrl) => (
        <img
          src={`${gifUrl}`}
          alt="avatar"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Bodypart',
      dataIndex: 'bodyPart',
      key: 'bodyPart',
      width: '40%',
      ...getColumnSearchProps('bodyPart'),
    },
    {
      title: 'Equipment',
      dataIndex: 'equipment',
      key: 'equipment',
      width: '50%',
      ...getColumnSearchProps('equipment'),
    },
  ];
  return (
    <div
      style={{
        marginBottom: 16,
      }}>
      <Input
        style={{ width: '30%' }}
        size="default"
        prefix={<UserOutlined />}
        placeholder="Client's Email"
        name="email"
        value={email}
        onChange={handleEmail}
      />
      <Button
        type="default"
        onClick={handleSubmission}
        disabled={!hasSelected}
        loading={loading}>
        Send WO Plan
      </Button>

      <span
        style={{
          marginLeft: 8,
        }}>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </span>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        dataSource={exercises.workouts}
      />
    </div>
  );
};

export default WoPlan;
