// Profile.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Import Navbar component
import './Profile.css'; // Import CSS for Profile styling

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume user is logged in for demonstration

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Add logic for logout
    console.log('User logged out');
  };

  // Dummy user data; replace with actual data fetch or props
  const user = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
  };

  return (
    <div className="profile-container">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /> {/* Include the Navbar */}
      <div className="profile-content">
        <h2>Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
