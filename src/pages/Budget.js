import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Budget = () => {
  const [expenses, setExpenses] = useState({});
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const token = localStorage.getItem('token');

  const categories = ['Food', 'Clothes', 'Education', 'Miscellaneous'];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/expenses', {
        headers: { 'auth-token': token },
      });

      const expensesByCategory = res.data.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
      }, {});
      setExpenses(expensesByCategory);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddBudget = () => {
    if (newCategory && newBudget) {
      setCategoryBudgets({
        ...categoryBudgets,
        [newCategory]: parseFloat(newBudget),
      });
      setNewCategory('');
      setNewBudget('');
      setShowAddBudget(false);
    } else {
      alert('Please select a category and enter a budget amount.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-16">
      <div className="flex justify-between items-center">
        <h2 className="mt-2 mb-2 text-white">Budget by Category</h2>
        <button 
          onClick={() => setShowAddBudget(!showAddBudget)} 
          className="btn btn-primary"
        >
          {showAddBudget ? 'Close' : 'Add Budget'}
        </button>
      </div>

      {showAddBudget && (
        <div className="my-4 p-4 bg-gray-200 rounded-md">
          <h3>Add New Budget</h3>
          <label>
            Category:
            <select 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)} 
              className="form-control mb-2"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Budget Amount:
            <input
              type="number"
              placeholder="Budget Amount"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="form-control mb-2"
              required
            />
          </label>
          <button 
            onClick={handleAddBudget} 
            className="btn btn-success"
          >
            Save Budget
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {Object.keys(categoryBudgets).map((category) => (
          <div 
            key={category} 
            className="bg-white p-4 shadow-md rounded-lg border" // Matching Expense card styles
            style={{ width: '100%', minHeight: '180px' }} // Ensure consistent sizing
          >
            <h3 className="text-blue-600 font-semibold mb-2">{category}</h3>
            <p><strong>Set Budget:</strong> ${categoryBudgets[category].toFixed(2)}</p>
            <p><strong>Total Expenses:</strong> ${expenses[category]?.toFixed(2) || 0}</p>
            <p>
              <strong>Remaining Budget:</strong> $
              {(categoryBudgets[category] - (expenses[category] || 0)).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;