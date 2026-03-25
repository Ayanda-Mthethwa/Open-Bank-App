import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
  };

  return (
    <div className="login-page">
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
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Login Card */}
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Logo inside the card as shown in screenshot */}
          <motion.div 
            className="logo-container"
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
          </motion.div>

          <form onSubmit={handleSubmit} className="login-form">
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

            <div className="form-options">
              <motion.label 
                className="checkbox-container"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <motion.span 
                  className="checkbox-custom"
                  animate={{ backgroundColor: rememberMe ? "#3182ce" : "#fff" }}
                  transition={{ duration: 0.2 }}
                >
                  {rememberMe && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="check-icon"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 2.28L4 8.56l-2.28-2.28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  )}
                </motion.span>
                <span className="checkbox-label">Remember Me</span>
              </motion.label>

              <motion.button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot Password?
              </motion.button>
            </div>

            <Link path="/dashboard"><motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(49, 130, 206, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Login
            </motion.button></Link>
          </form>

          {/* Footer Sign Up Link */}
          <motion.div 
            className="login-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="footer-text">
              New to OpenBank?{' '}
              <motion.button
                className="signup-link"
                onClick={handleSignUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;