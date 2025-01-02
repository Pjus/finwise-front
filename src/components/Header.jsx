import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // 상태 초기화
    navigate('/'); // 메인 페이지로 이동
  };
  return (
    <header className="header">
      <div className="logo">FinWise</div>
      <nav className="nav-links">
        <a href="#Chart">Chart</a>
        <a href="#Portfolio">Portfolio</a>
        <a href="#Backtest">Backtest</a>

        {auth.isLoggedIn ? (
          <div className="user-info">
            <span>Welcome, <strong><a href="/profile">{auth.user.username}</a></strong></span>
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <>
            <a href="/signup" className="button signup">Sign Up</a>
            <a href="/login" className="button login">Log In</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
