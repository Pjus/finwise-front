import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EmailVerification from './pages/EmailVerification';
import UserProfile from './pages/UserProfile';

const App = () => (
  <Router>
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/verify-email/:uid/:token" element={<EmailVerification />} />
      </Routes>
      <Features />
      <Footer />
    </div>
  </Router>
);

export default App;
