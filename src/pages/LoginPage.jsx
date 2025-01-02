import React, { useState } from 'react';
import api from '../api';

const LoginPage = () => {
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
      const { access, refresh } = response.data; // JWT 토큰
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setMessage('Login successful!');
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
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
