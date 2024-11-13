const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const fetchuser = require('../middleware/fetchuser')
const Budget = require('../models/Budget');
// Add an expense
router.post('/add',fetchuser, async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    const userId = req.id; 
    
    const budget = await Budget.findOne({ user:userId,category });
    
    if (!budget) {
      return res.status(400).json({ message: 'Budget not found for this category.' });
    }
    const remaining = budget.budgetAmount - budget.expenses;
    if (remaining < amount) {
      return res.status(400).json({ message: 'Not enough budget remaining for this category.' });
    }

    budget.expenses = Number(budget.expenses) + Number(amount);
    await budget.save();

    const newExpense = new Expense({
      user: userId,
      category,
      amount,
      description,
      date,
    });

    const savedExpense = await newExpense.save();
    
    res.json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error });
  }
});

// Get expenses for a user
router.get('/', fetchuser,async (req, res) => {
  try {
    const userId = req.id; 
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expenses', error });
  }
});

// Example endpoint to aggregate expenses by category
router.get('/spending', async (req, res) => {
  const expenses = await Expense.aggregate([
    { $group: { _id: '$category', totalExpenses: { $sum: '$amount' } } },
  ]);
  console.log(expenses);
  
  res.json(expenses);
});

module.exports = router;
