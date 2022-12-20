import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';
const API_URL2 = 'https://shy-jade-dalmatian-cape.cyclic.app';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}>
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const ClientsList2 = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllClients();
  }, [user]);

  const getAllClients = () => {
    if (!user) return;
    console.log('USER: ', user);
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${API_URL}/api/users/${user?._id}/clients`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setClients(response.data);
      })
      .catch((error) => console.log(error));
  };
  const [count, setCount] = useState(2);
  const handleDelete = (client) => {
    const userId = user._id;
    return axios
      .put(`${API_URL}/api/user/deleteclient`, { client, userId })
      .then((response) => {
        getAllClients();
      });
  };
  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'username',
      width: '30%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Delete Client',
      dataIndex: 'operation',
      render: (_, record) =>
        clients.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      username: name,
      email: email,
    };
    const userId = user._id;
    axios
      .post(`${API_URL}/api/user/addClient`, { newData, userId })
      .then((response) => {
        getAllClients();
      });

    setClients([...clients, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...clients];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setClients(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <div className="inputclient">
        <input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        onClick={handleAdd}
        type="default"
        style={{
          marginBottom: 16,
        }}>
        Add Client
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={clients}
        columns={columns}
      />
    </div>
  );
};
export default ClientsList2;
