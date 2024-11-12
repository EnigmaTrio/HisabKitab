import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [recentBudgets, setRecentBudgets] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      const [expensesRes, budgetsRes] = await Promise.all([
        axios.get('http://localhost:4000/api/expenses', {
          headers: { 'auth-token': token },
        }),
        axios.get('http://localhost:4000/api/budgets', {
          headers: { 'auth-token': token },
        }),
      ]);

      const sortedExpenses = expensesRes.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentExpenses(sortedExpenses);

      const sortedBudgets = budgetsRes.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(budget => ({
          ...budget,
          date: isNaN(new Date(budget.date).getTime())
            ? 'Invalid Date' 
            : new Date(budget.date).toLocaleDateString(),
        }));

      setRecentBudgets(sortedBudgets);

    } catch (error) {
      console.error('Error fetching recent transactions:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-16">
      <h2 className="text-center text-white mb-4 underline">Recent Transactions</h2>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-center text-green-400 mb-4">Recent Budgets</h3>
          <div className="grid grid-cols-1 gap-4">
            {recentBudgets.map((budget) => (
              <div
                key={budget._id}
                className="bg-white p-4 shadow-md rounded-lg border"
              >
                <p className="text-sm font-bold text-gray-500">
                </p>
                <p><strong>Category:</strong> {budget.category}</p>
                <p><strong>Budget Amount:</strong> ${budget.budgetAmount}</p>
                <p><strong>Expenses:</strong> ${budget.expenses || 0.00}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-center text-green-400 mb-4">Recent Expenses</h3>
          <div className="grid grid-cols-1 gap-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense._id}
                className="bg-white p-4 shadow-md rounded-lg border"
              >
                <p className="text-sm font-bold text-gray-500">
                </p>
                <p><strong>Category:</strong> {expense.category}</p>
                <p><strong>Amount:</strong> ${expense.amount}</p>
                <p><strong>Description:</strong> {expense.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;