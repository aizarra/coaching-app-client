import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoCoachApp from '../assets/logoCoachApp.png';

import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5005';
const API_URL2 = 'https://shy-jade-dalmatian-cape.cyclic.app';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [usersType, setUsersType] = useState(' ');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleUsersType = (e) => setUsersType(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, username, usersType };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column',
        }}>
        <img
          src={logoCoachApp}
          width="200"
          style={{ alignSelf: 'center' }}
          alt="logo"
        />
        <div className="SignupPage">
          <h1>Sign Up</h1>

          <form onSubmit={handleSignupSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={username}
              onChange={handleName}
            />

            <label for="usersType-select"></label>
            <select
              onChange={handleUsersType}
              name="usersType"
              className="usersType-select">
              <option value=" ">I am a ...</option>
              <option value="trainer">Trainer</option>
              <option value="client">Client</option>
            </select>
            <button type="submit">Sign Up</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link to={'/login'}> Login</Link>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
