// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.status_code !== 200) {
        throw new Error(data.message);
      }     
      localStorage.setItem('authToken', data.data.token);

      navigate('/profile');

    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  const handleSignupRedirect = () => {
    // Redirect to the sign-up page
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {/* Sign Up button */}
      <div className="auth-options">
        <button onClick={handleSignupRedirect} className="signup-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;