// routes/budget.js
const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

const fetchuser = require('../middleware/fetchuser')

// Get all budgets for a user
router.get('/', fetchuser, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
});

// Add or update a budget for a specific category
router.post('/add', fetchuser, async (req, res) => {
  const { category, budgetAmount } = req.body;

  try {
    // Check if budget for category already exists
    let budget = await Budget.findOne({ userId: req.id, category });
    // console.log(budget);
    
    if (budget) {
      // Update existing budget
      budget.budgetAmount = budgetAmount;
      await budget.save();
      res.json({ message: 'Budget updated successfully', budget });
    } else {
      // Create a new budget
      console.log(req.id);
      const userId=req.id;
      budget = new Budget({
        user: userId,
        category,
        budgetAmount,
      });
      console.log(budget);
      await budget.save();
      
      res.status(201).json({ message: 'Budget created successfully', budget });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add/update budget' });
  }
});

module.exports = router;