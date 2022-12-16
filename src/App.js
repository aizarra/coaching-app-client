import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import DashboardTrainer from './pages/DashboardTrainer';
import DashboardClient from './pages/DashboardClient';
import Layout from './components/Layout';
import PlanForClient from './pages/PlanForClient';

function App() {
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [location.pathname, showNav]);

  return (
    <div className="App">
      {/* <nav>{showNav && <Navbar />}</nav> */}

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/DashboardTrainer"
          element={
            <Layout>
              <DashboardTrainer />
            </Layout>
          }
        />
        <Route
          path="/DashboardClient"
          element={<DashboardClient />}
        />
        <Route
          path="/PlanForClient"
          element={<PlanForClient />}
        />
      </Routes>
    </div>
  );
}

export default App;
