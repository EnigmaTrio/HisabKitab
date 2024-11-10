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
      localStorage.setItem('userName', res.data.user.name);
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    }
  };

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