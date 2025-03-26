import React, { useEffect, useState } from 'react';
import CustomeLink from '../common_components/CustomeLink';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Function to check and decode token
  const checkUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser(); // Initial check on component mount

    // Listen for token changes across tabs or same tab
    const handleStorageChange = () => checkUser();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    // Force update across tabs
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="flex justify-between flex-wrap border-b p-4">
      <div className="left">
        <ul className="nav">
          <CustomeLink linkAddress="/home" linkName="LOGO" />
          <CustomeLink linkAddress="/home" linkName="Home" />
          <CustomeLink linkAddress="/about-us" linkName="About Us" />
          <CustomeLink linkAddress="/contact-us" linkName="Contact Us" />
        </ul>
      </div>

      <div className="right">
        <ul className="nav justify-content-end gap-2 items-center">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">Welcome, {user.name}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <CustomeLink linkAddress="/login" linkName="Login" />
              <CustomeLink linkAddress="/register" linkName="Register" />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
