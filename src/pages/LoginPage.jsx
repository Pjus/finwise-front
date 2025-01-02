import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/accounts/login/', {
        username: formData.username,
        password: formData.password,
      });
      const { access_token, refresh_token } = response.data; // JWT 토큰
      console.log(response.data);
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      setMessage('Login successful!');
      login(response.data); // 로그인 상태 업데이트
      navigate('/'); // 로그인 후 대시보드로 이동

    } catch (error) {
      setMessage('Login failed. Please check your email and password.');
      console.error(error.response.data);
    }
  };

  return (
    <div className="auth-page">
      <h1>Log In</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="login-button" type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
