import Navbar from '../components/Navbar';
import logoCoachApp from '../assets/logoCoachApp.png';
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          <img
            width="400"
            src={logoCoachApp}
            alt="companylogo"
            style={{ alignSelf: 'center' }}
          />
          <p className="subtitle">Flexible, easy to use coaching system</p>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
            }}>
            <p className="hptext">
              Schedule your sessions, set meal plans, manage workout programs,
              stay connected with your clients, easy billing with Coach.Me -
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translate(-50%, -50%)',
            }}>
            <button className="hpbutton">
              <Link to="/signup">COACH MY CLIENTS</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
