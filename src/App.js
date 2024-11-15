import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import Budget from './pages/Budget';
import LandingPage from './pages/landingpage'
import SpendingPatterns from './pages/SpendingPatterns';
function App() {
  return (
    <Router>
      <Navbar />
      <div className=" pt-16">
        <Routes>
        <Route  path="/"  element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/demo" element={<LandingPage />} />
          <Route path="/spending" element={<SpendingPatterns />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
