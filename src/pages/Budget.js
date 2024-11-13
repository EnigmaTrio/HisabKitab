import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Budget = () => {
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const token = localStorage.getItem('token');

  const categories = ['Food', 'Clothes', 'Education', 'Miscellaneous'];

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/budgets', {
        headers: { 'auth-token': token },
      });

      const budgetData = res.data.reduce((acc, budget) => {
        acc[budget.category] = {
          budgetAmount: budget.budgetAmount,
          expenses: budget.expenses, 
        };
        return acc;
      }, {});
      setCategoryBudgets(budgetData);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };


  const handleAddBudget = async () => {
    if (newCategory && newBudget) {
      try {
        const existingExpenses = categoryBudgets[newCategory]?.expenses || 0;
        await axios.post(
          'http://localhost:4000/api/budgets/add',
          { category: newCategory, budgetAmount: parseFloat(newBudget) },
          { headers: { 'auth-token': token } }
        );
        setCategoryBudgets({
          ...categoryBudgets,
          [newCategory]: { budgetAmount: parseFloat(newBudget),expenses: existingExpenses  },
        });
        alert('Budget added successfully!');
        setNewCategory('');
        setNewBudget('');
        setShowAddBudget(false);
      } catch (error) {
        console.error('Error saving budget:', error);
      }
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
            className="btn btn-success mb-1"
          >
            Save Budget
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {Object.keys(categoryBudgets).map((category) => {
          const budgetAmount = categoryBudgets[category].budgetAmount;
          const expenses = categoryBudgets[category].expenses || 0.00;
          const savings = budgetAmount - expenses;

          return (
            <div 
              key={category} 
              className="bg-white p-4 shadow-md rounded-lg border"
              style={{ width: '100%', minHeight: '180px' }}
            >
              <h3 className="text-blue-600 font-semibold mb-2">{category}</h3>
              <p><strong>Budget:</strong> ${budgetAmount.toFixed(2)}</p>
              <p><strong>Expenses:</strong> ${expenses.toFixed(2)}</p>
              <p><strong>Savings:</strong> ${savings.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;