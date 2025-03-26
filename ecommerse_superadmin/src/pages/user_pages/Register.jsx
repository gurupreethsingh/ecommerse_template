import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:3007/api/register', formData);
      console.log('User registered successfully');
      setError('');
      alert("Registertion successful, navigating to login page.")
      navigate('/login');
    } catch (error) {
      console.log('Error in registration', error);
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="flex justify-center  mt-5 mb-5">
      <div className="border p-6 rounded  bg-white w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            className="w-full p-2 border rounded mb-4"
            onChange={handleInputChange}
            value={formData.name}
          />
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
