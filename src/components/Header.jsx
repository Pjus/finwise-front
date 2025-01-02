import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const Header = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">FinWise</div>
      <nav className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>

        {auth.isLoggedIn ? (
          <div className="user-info">
            <span>Welcome, <strong>{auth.user.username}</strong></span>
            <button className="logout-button" onClick={logout}>Log Out</button>
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
