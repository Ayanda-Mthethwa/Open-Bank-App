import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Registration attempt:', { fullName, email, password });
  };

  const handleLogin = () => {
    console.log('Navigate to login');
  };

  return (
    <div className="register-page">
      {/* Background Gradient */}
      <div className="gradient-background"></div>
      
      {/* Animated Banking Background Elements */}
      <div className="background-elements">
        <motion.div 
          className="bg-circle circle-1"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="bg-circle circle-2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div 
        className="register-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Register Card */}
        <motion.div 
          className="register-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Logo and Title */}
          <motion.div 
            className="header-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bank-logo">
              <div className="logo-circle">
                <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="bank-name">OpenBank</h1>
            </div>
            <h2 className="register-title">Register for Account</h2>
          </motion.div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Full Name Field */}
            <div className="form-group">
              <label className="form-label">John Doe</label>
              <motion.div 
                className="input-container"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  placeholder=""
                  required
                />
                <span className="input-icon">👤</span>
              </motion.div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <motion.div 
                className="input-container"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder=""
                  required
                />
                <span className="input-icon">✉️</span>
              </motion.div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <motion.div 
                className="input-container"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder=""
                  required
                />
                <span className="input-icon">🔒</span>
              </motion.div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <motion.div 
                className="input-container"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  placeholder=""
                  required
                />
                <span className="input-icon">🔒</span>
              </motion.div>
            </div>

            {/* Register Button */}
            <motion.button
              type="submit"
              className="register-button"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(49, 130, 206, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Register
            </motion.button>
          </form>

          {/* Footer Login Link */}
          <motion.div 
            className="register-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="footer-text">
              Already have an account?{' '}
              <motion.button
                className="login-link"
                onClick={handleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;