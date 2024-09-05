// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">AppName</Link>
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li><Link to="/profile" className="navbar-item">Profile</Link></li>
              <li><button onClick={onLogout} className="navbar-item navbar-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="navbar-item">Login</Link></li>
              <li><Link to="/signup" className="navbar-item">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
