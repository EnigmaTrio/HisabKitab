import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

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
        onClick={() => navigate('/login')}
        className="mt-8 px-6 py-3 bg-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-800"
      >
        Sign In
      </button>
    </div>
  );
};

export default LandingPage;