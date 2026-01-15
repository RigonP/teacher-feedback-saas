import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">🛡️</div>
          <span className="logo-text">ToxicityGuard</span>
        </Link>

        <button 
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/playground" 
            className={`navbar-link ${isActive('/playground') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            API Playground
          </Link>
          <Link 
            to="/pricing" 
            className={`navbar-link ${isActive('/pricing') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            to="/docs" 
            className={`navbar-link ${isActive('/docs') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Docs
          </Link>

          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <div className="navbar-user">
                <span className="user-name">{user?.name || 'User'}</span>
                <button onClick={logout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button className="btn-login" onClick={() => {
              // Demo login
              const demoUser = { name: 'Demo User', email: 'demo@example.com' };
              const demoApiKey = 'sk_demo_1234567890abcdef';
              alert('Demo Login - Use API Key: ' + demoApiKey);
            }}>
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;