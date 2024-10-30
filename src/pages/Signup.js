// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      alert('Signup successful! Please log in.');
      navigate('/login'); // Redirect to login page after signup
    } catch (error) {
      console.error('Signup failed', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto">
      <h2 className="text-center mb-4">Signup</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary w-100">Signup</button>
    </form>
  );
};

export default Signup;
