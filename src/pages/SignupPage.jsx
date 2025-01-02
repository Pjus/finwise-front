import React, { useState } from 'react';
import api from '../api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null); // 추가적인 에러 디테일

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 데이터 POST 요청
      const response = await api.post('/accounts/signup/', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        password_confirm: formData.confirmPassword, // 백엔드로 전송
      });

      setMessage('Signup successful! Please check your email for verification.');
      setSignupSuccess(true); // 성공 상태 변경

    } catch (error) {
      // 에러 처리
      if (error.response) {
        setMessage('Signup failed.');
        setErrorDetails(error.response.data); // 에러 디테일 저장
      } else {
        setMessage('An unexpected error occurred.');
        setErrorDetails(error.message); // 네트워크 에러 또는 기타 에러
      }
      console.error(error.response?.data || error.message); // 디버깅용
    }
  };

  return (
    
    <div className="auth-page">
       {!signupSuccess ?(
               <div>
               <h1>Sign Up</h1>
               <form className="auth-form" onSubmit={handleSubmit}>
                 <label>
                   Email:
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                   />
                 </label>
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
                 <label>
                   Confirm Password:
                   <input
                     type="password"
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     required
                   />
                 </label>
                 <button type="submit">Sign Up</button>
               </form>
               </div>
       ):(
          <div>
            <h1>Sign Up</h1>
          </div>
       )}

      {message && <p>{message}</p>}
      {errorDetails && (
        <div>
          <h3>Error Details:</h3>
          <pre>{JSON.stringify(errorDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
