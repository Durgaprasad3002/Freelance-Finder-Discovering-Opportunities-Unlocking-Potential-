import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-brand">
          <span className="brand-sb">SB</span>
          <span className="brand-works">Works</span>
        </div>
        
        <div className="nav-links">
          <Link to="/login" className="signin-btn">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Empower Your Journey: Elevate
            <span className="title-highlight"> Your Craft on SB Works</span>
          </h1>
          
          <p className="hero-description">
            Dive into a realm of endless possibilities with SB Works. Unleash your creativity, 
            skills, and passion as you embark on a freelancing journey like never before. 
            Our platform is a thriving marketplace where innovation meets opportunity, 
            connecting talented freelancers with businesses seeking excellence.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Get Started
              <span className="btn-icon">→</span>
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Active Freelancers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5k+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$2M+</span>
              <span className="stat-label">Earned by Freelancers</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="grid-pattern"></div>
        </div>
      </div>

      {/* Wave Divider - Updated with teal gradient */}
      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradient)" 
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Landing;