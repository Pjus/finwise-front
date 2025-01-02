import React from 'react';

const Header = () => (
  <header className="header">
    <div className="logo">FinWise</div>
    <nav className="nav">
      <a href="#features">Features</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="/signup" className="button signup">Sign Up</a>
      <a href="/login" className="button login">Log In</a>
    </nav>
  </header>
);

export default Header;
