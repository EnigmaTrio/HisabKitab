// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      
      localStorage.setItem('userName', res.data.user.name); // Save the user's name
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto">
      <h2 className="text-center mb-4">Login</h2>
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
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default Login;
