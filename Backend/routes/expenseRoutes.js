const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const fetchuser = require('../middleware/fetchuser')
// Add an expense
router.post('/add',fetchuser, async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    const userId = req.id; 
    
    const newExpense = new Expense({
      user: userId,
      category,
      amount,
      description,
      date,
    });

    console.log(newExpense);
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

module.exports = router;
