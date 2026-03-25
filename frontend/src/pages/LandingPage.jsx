import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe, CreditCard, TrendingUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

 // const handleGetStarted = () => {
 //   navigate('/register');
 // };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const features = [
    {
      icon: <Zap size={32} />,
      title: "Instant Transfers",
      description: "Send money anywhere in seconds with zero fees"
    },
    {
      icon: <Shield size={32} />,
      title: "Bank-Level Security",
      description: "Your funds are protected with enterprise-grade encryption"
    },
    {
      icon: <Globe size={32} />,
      title: "Global Access",
      description: "Bank anywhere with our worldwide network of partners"
    },
    {
      icon: <CreditCard size={32} />,
      title: "Smart Cards",
      description: "Virtual and physical cards with advanced spending controls"
    }
  ];

  const stats = [
    { value: "2M+", label: "Happy Customers" },
    { value: "$5B+", label: "Assets Managed" },
    { value: "150+", label: "Countries Served" },
    { value: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "OpenBank transformed how I manage my business finances. The interface is intuitive and the support team is exceptional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Freelance Developer",
      content: "As a digital nomad, I need a bank that works everywhere. OpenBank delivers seamless international banking.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "University Student",
      content: "The student account features saved me so much money. Zero fees and great budgeting tools!",
      rating: 5
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="logo-circle">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">OpenBank</span>
          </motion.div>
          
          <div className="nav-links">
            {['Features', 'Benefits', 'Testimonials'].map((item) => (
              <button
                key={item}
                className="nav-link"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
          
          <div className="nav-actions">
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <motion.button
              className="get-started-btn"
              onClick={handleSignUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="gradient-overlay"></div>
        
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="hero-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              🚀 Next-Gen Banking
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Banking Made <span className="gradient-text">Simple</span>, 
              Secure & <span className="gradient-text">Smart</span>
            </motion.h1>
            
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join millions who trust OpenBank for their financial needs. 
              Experience zero-fee banking, instant transfers, and cutting-edge 
              security—all in one beautiful app.
            </motion.p>
            
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                className="primary-btn"
                onClick={handleSignUp}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(49, 130, 206, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Open Free Account <ArrowRight size={20} />
              </motion.button>
              <button className="secondary-btn" onClick={() => scrollToSection('features')}>
                Learn More
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="screen-content">
                  <div className="balance-card">
                    <div className="balance-header">
                      <span>Total Balance</span>
                      <TrendingUp size={20} color="#10B981" />
                    </div>
                    <div className="balance-amount">$45,231.89</div>
                    <div className="balance-change">+12.5% this month</div>
                  </div>
                  
                  <div className="quick-actions">
                    {['Send', 'Request', 'Invest', 'Pay'].map((action) => (
                      <div key={action} className="quick-action">
                        <div className="action-icon">{action.charAt(0)}</div>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="recent-transactions">
                    <div className="transaction">
                      <div className="transaction-info">
                        <div className="transaction-icon">🛒</div>
                        <div>
                          <div className="transaction-name">Amazon Purchase</div>
                          <div className="transaction-date">Today, 10:30 AM</div>
                        </div>
                      </div>
                      <div className="transaction-amount">-$89.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose OpenBank?</h2>
            <p>Experience banking that adapts to your lifestyle</p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <div className="section-container">
          <div className="benefits-content">
            <motion.div
              className="benefits-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>Smart Banking for Modern Life</h2>
              <p>
                OpenBank combines cutting-edge technology with human-centric design 
                to deliver a banking experience that truly works for you.
              </p>
              
              <div className="benefits-list">
                {[
                  "No hidden fees or monthly charges",
                  "Instant international transfers",
                  "Advanced fraud protection",
                  "AI-powered financial insights",
                  "24/7 customer support",
                  "Carbon-neutral banking"
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="benefit-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <CheckCircle size={20} color="#10B981" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="benefits-visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="cards-stack">
                <motion.div 
                  className="card card-1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="card card-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div 
                  className="card card-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 0.1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Trusted by Thousands</h2>
            <p>See what our customers are saying</p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="stars">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2>Ready to Revolutionize Your Banking?</h2>
            <p>Join OpenBank today and experience the future of finance</p>
            
            <motion.button
              className="cta-button"
              onClick={handleSignUp}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(49, 130, 206, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free <ArrowRight size={20} />
            </motion.button>
            
            <div className="cta-note">
              <Shield size={16} />
              <span>No credit card required • 30-day free trial</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <div className="logo-circle">
                <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="logo-text">OpenBank</span>
            </div>
            <p className="footer-tagline">
              Banking reimagined for the digital age
            </p>
            <div className="social-links">
              {['twitter', 'linkedin', 'instagram', 'facebook'].map((platform) => (
                <motion.button
                  key={platform}
                  className="social-icon"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {platform.charAt(0).toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Product</h4>
              {['Features', 'Security', 'API'].map((link) => (
                <button key={link} className="footer-link" onClick={() => scrollToSection('features')}>
                  {link}
                </button>
              ))}
            </div>
            <div className="link-column">
              <h4>Company</h4>
              {['About', 'Careers', 'Blog'].map((link) => (
                <button key={link} className="footer-link">{link}</button>
              ))}
            </div>
            <div className="link-column">
              <h4>Account</h4>
              <button className="footer-link" onClick={handleLogin}>Login</button>
              <button className="footer-link" onClick={handleSignUp}>Sign Up</button>
              <button className="footer-link" onClick={handleLogin}>Help Center</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 OpenBank. All rights reserved. Banking services provided by OpenBank Financial LLC.</p>
          <div className="compliance-badges">
            <div className="badge">🔒 SSL Secure</div>
            <div className="badge">🏦 FDIC Insured</div>
            <div className="badge">🌱 Carbon Neutral</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;