import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect if token not found
    } else {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Remove invalid token
        navigate('/login'); // Redirect to login
      }
    }
  }, [navigate]);

  if (!user) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex justify-end p-4">
      <p><strong>{user.name}</strong></p>
    </div>
  );
};

export default UserComponent;
