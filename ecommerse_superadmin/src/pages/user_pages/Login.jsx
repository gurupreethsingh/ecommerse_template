import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input field typing.');

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting the form to register');

    // Check for empty fields
    if ( !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
     const response =  await axios.post('http://localhost:3007/api/login', formData);

          // ✅ Save token to localStorage
    const { token } = response.data;
    localStorage.setItem('token', token);

      console.log('User login successfully');
      setError('');
      alert("Login successful, navigating to Dashboard page.")
      navigate('/dashboard');
    } catch (error) {
      console.log('Error in login', error);
      setError('Login failed. Try again.');
    }
  };

  return (
    <div className="flex justify-center  mt-5 mb-5">
      <div className="border p-6 rounded  bg-white w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
         
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            className="w-full p-2 border rounded mb-4"
            onChange={handleInputChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="w-full p-2 border rounded mb-6"
            onChange={handleInputChange}
            value={formData.password}
          />
          <button
            type="submit"
            className="btn btn-sm btn-outline-danger rounded-pill w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
