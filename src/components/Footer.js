import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <div className="logo-icon">🛡️</div>
              <span className="logo-text">ToxicityGuard</span>
            </div>
            <p className="footer-description">
              Moderimi inteligjent i përmbajtjes me AI. Mbro platformën tënde nga përmbajtja toksike.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li><Link to="/">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/playground">API Playground</Link></li>
              <li><Link to="/docs">Documentation</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">GDPR</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 ToxicityGuard. All rights reserved.</p>
          <p className="footer-credits">
            Made with ❤️ for a safer internet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;