import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const EmailVerification = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/accounts/verify/${uid}/${token}/`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.error || 'An error occurred.');
      }
    };

    verifyEmail();
  }, [uid, token]);

  return (
    <div style={styles.container}>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh', // 화면 중앙 정렬
    textAlign: 'center',
  },
  message: {
    fontSize: '24px', // 글자 크기 키우기
    fontWeight: 'bold', // 굵은 글씨
    color: '#333', // 글자 색
  },
};

export default EmailVerification;
