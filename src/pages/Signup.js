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
      await axios.post('http://localhost:4000/api/auth/signup', { name, email, password });
      alert('Signup successful! Please log in.');
      navigate('/'); // Redirect to login page after signup
    } catch (error) {
      console.error('Signup failed', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800 text-white">
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10 bg-blue-400 bg-opacity-20 p-8 rounded-lg shadow-lg ">
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
      <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-200 underline cursor-pointer hover:text-white"
            >
              Login
            </span>
          </p>
        </div>
    </form>
    </div>
  );
};

export default Signup;