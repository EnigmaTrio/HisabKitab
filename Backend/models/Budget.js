// models/Budget.js
const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
 },
  category: {
    type: String,
    required: true,
  },
  budgetAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Budget", BudgetSchema);
