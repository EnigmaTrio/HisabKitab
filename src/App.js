// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import LandingPage from './pages/landingpage';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container pt-16">
        <Routes>
        <Route  path="/"  element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/demo" element={<LandingPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
