import React from 'react';
import './Footer.css';
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo from "../assets/bus_logo.png";
export function Footer() {
  return (
    <footer className="footer-container">
      
      <div className="footer-content">
        
        {/* Brand Info */}
        <div className="footer-section footer-brand">
          <h4 style={{ color: '#d84e55' }}>RouteX</h4>
          <p>  <img className='footer-logo' src={logo2} alt="logo" />
            RouteX is the one of the world's largest online bus ticket booking service trusted by over 25 million happy customers globally.
          </p>
        </div>

        {/* About Column */}
        <div className="footer-section">
          <h4>About RouteX</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Mobile version</a></li>
            <li><a href="#">redBus on mobile</a></li>
          </ul>
        </div>

        {/* Info Column */}
        <div className="footer-section">
          <h4>Info</h4>
          <ul>
            <li><a href="#">T&C</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Bus operator registration</a></li>
          </ul>
        </div>

        {/* Global Sites */}
        <div className="footer-section">
          <h4>Global Sites</h4>
          <ul>
            <li><a href="#">India</a></li>
            <li><a href="#">Singapore</a></li>
            <li><a href="#">Malaysia</a></li>
            <li><a href="#">Indonesia</a></li>
            <li><a href="#">Peru</a></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 ibibogroup All rights reserved</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      
    </footer>
  );
}