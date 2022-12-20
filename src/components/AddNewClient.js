import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const API_URL = 'http://localhost:5005';
const API_URL2 = 'https://shy-jade-dalmatian-cape.cyclic.app';

export function AddNewClient() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
  user && console.log(user);

  const navigate = useNavigate();

  const handleName = (e) => setUserName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleAddClient = (e) => {
    e.preventDefault();
    const loggedIn = user._id;
    const requestBody = { username, email, loggedIn };

    return axios
      .post(`${API_URL}/api/addClient`, requestBody)
      .then((response) => {
        console.log(response, 'responseresoinse');
        window.location.reload();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddNewClient">
      <h1>Add Client</h1>

      <form
        className="formcontainer"
        onSubmit={handleAddClient}>
        <div className="inputfields">
          <label>Email:</label>
          <input
            className="emailfield"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Name:</label>
          <input
            className="usernamefield"
            type="username"
            name="username"
            value={username}
            onChange={handleName}
          />
        </div>
        <button
          className="submitbutton"
          type="submit">
          Add New Client
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
