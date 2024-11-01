// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false); // Toggle between landing and login pages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  if (!showLogin) {
    // Landing page with feature grid and Sign In button
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800 text-white">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">Welcome to HisabKitab</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="p-6 bg-blue-400 bg-opacity-20 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-2 drop-shadow-md">Daily Expense Tracking</h3>
            <p className="text-sm">Log and monitor your daily expenses across various categories.</p>
          </div>
          <div className="p-6 bg-blue-400 bg-opacity-20 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-2 drop-shadow-md">Budget Setting</h3>
            <p className="text-sm">Set budgets tailored to your spending patterns and financial goals.</p>
          </div>
          <div className="p-6 bg-blue-400 bg-opacity-20 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-2 drop-shadow-md">Expense Summaries</h3>
            <p className="text-sm">Access clear, visual summaries of your expenses over a period of time.</p>
          </div>
          <div className="p-6 bg-blue-400 bg-opacity-20 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-2 drop-shadow-md">Bill Alerts & Savings</h3>
            <p className="text-sm">Receive alerts for upcoming bills and track your savings effectively.</p>
          </div>
        </div>
        <button
          onClick={() => setShowLogin(true)}
          className="mt-8 px-6 py-3 bg-blue-700  font-semibold rounded-full shadow-md hover:bg-blue-800"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Login form
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800 text-white">
      <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 bg-blue-400 bg-opacity-20 p-8 rounded-lg shadow-lg ">
        <h2 className="text-center mb-4 text-2xl font-bold">Login</h2>
        <input
          type="email"
          className="form-control mb-3 border p-2 rounded w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3 border p-2 rounded w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full bg-blue-600 text-white p-2 rounded">Login</button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-200 underline cursor-pointer hover:text-white"
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;