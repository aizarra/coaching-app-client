import React, { useEffect } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Result, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoCoachApp from '../assets/logoCoachApp.png';

const PlanForClient = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/DashboardTrainer');
    }, 4000);
  }, [navigate]);
  return (
    <>
      <Image
        width={200}
        align="center"
        src={logoCoachApp}
      />

      <Result
        icon={<SmileOutlined />}
        title="Great, your client has a fitness plan!"
      />
    </>
  );
};

export default PlanForClient;
