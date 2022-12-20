import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../context/auth.context';
import { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import logoCoachApp from '../assets/logoCoachApp.png';
const API_URL = 'http://localhost:5005';
const API_URL2 = 'https://shy-jade-dalmatian-cape.cyclic.app';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usersType, setUsersType] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showNav, setShowNav] = useState(true);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsersType = (e) => setUsersType(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, usersType };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log(response);
        if (usersType === 'trainer') {
          navigate('/DashboardTrainer');
        } else {
          navigate('/DashboardClient');
        }
        console.log('JWT Token', response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        // navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <nav>{showNav && <Navbar />}</nav>
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
          alt="logo"></img>
        <div className="LoginPage">
          <h1>Login</h1>

          <form onSubmit={handleLoginSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
            <label for="usersType-select"></label>
            <select
              onChange={handleUsersType}
              name="usersType"
              className="usersType-select">
              <option value=" ">I am:</option>
              <option value="trainer">Trainer</option>
              <option value="client">Client</option>
            </select>
            <button type="submit">Login</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>Don't have an account yet?</p>
          <Link to={'/signup'}> Sign Up</Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
