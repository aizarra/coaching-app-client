import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { Table } from 'antd';

const API_URL = 'http://localhost:5005';
const API_URL2 = 'https://shy-jade-dalmatian-cape.cyclic.app';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getAllClients = () => {
      if (!user) return;
      console.log('USER: ', user);
      const storedToken = localStorage.getItem('authToken');
      axios
        .get(`${API_URL2}/api/users/${user?._id}/clients`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log(response.data);
          setClients(response.data);
        })
        .catch((error) => console.log(error));
    };
    getAllClients();
  }, [user]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={clients}
        size="small"
      />
    </>
  );
  // clients.length ? (
  //   clients.map((eachClient) => (
  //     <>
  //       <Table
  //         columns={columns}
  //         dataSource={eachClient}
  //         size="small"
  //       />
  //     </>
  //   ))
  // ) : (
  //   <></>
  // );

  // )
  // return (
  //   <div className="clientslist">
  //     <h1> Clients</h1>

  //     {clients.length ? (
  //       clients.map((eachClient) => (
  //         <div>
  //           <h5>{eachClient.username}</h5>
  //           <h5>{eachClient.email}</h5>
  //         </div>
  //       ))
  //     ) : (
  //       <></>
  //     )}
  //   </div>
  // );
};
export default ClientsList;
