import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css'; // Import FontAwesome

const AddExpense = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
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
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseDate = date || new Date().toISOString().split('T')[0];
      await axios.post(
        'http://localhost:4000/api/expenses/add',
        {
          category,
          amount,
          description,
          date: expenseDate,
        },
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      alert('Expense added successfully!');
      setCategory('');
      setAmount('');
      setDescription('');
      setDate('');
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/expenses/delete/${id}`, {
        headers: {
          'auth-token': token,
        },
      });
      alert('Expense deleted successfully!');
      fetchExpenses(); // Refresh the expenses list
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense');
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mt-2 mb-2 text-white">Add Expense</h2>
        
        {/* Dropdown for Category */}
        <label className="form-label text-white">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control mb-3"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary w-100">Add Expense</button>
      </form>

      <h3 className="mt-4 text-white">Your Expenses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {expenses.map((expense) => (
          <div key={expense._id} className="bg-white p-4 shadow-md rounded-lg border relative">
            {/* Trash icon positioned at the top-right */}
            <span
              onClick={() => handleDelete(expense._id)}
              className="absolute top-2 right-2 text-red-600 cursor-pointer"
            >
              <i className="fa fa-trash"></i>
            </span>
            <h4 className="text-blue-600 font-semibold mb-2">{expense.category}</h4>
            <p><strong>Amount:</strong> ${expense.amount}</p>
            <p><strong>Description:</strong> {expense.description}</p>
            <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddExpense;