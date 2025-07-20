const Transaction = require('../models/Transaction');

// Create transaction with backend-calculated total
const createTransaction = async (req, res) => {
  try {
    const { name, amount, quantity, category, notes, date, farmId } = req.body;

    // Ensure amount and quantity are numbers, then compute total
    const parsedAmount = parseFloat(amount);
    const parsedQuantity = parseFloat(quantity);
    const total = parsedAmount * parsedQuantity;

    const transaction = await Transaction.create({
      name,
      amount: parsedAmount,
      quantity: parsedQuantity,
      total,
      category,
      notes,
      date,
      farmId,
      userId: req.user._id,
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all transactions for the logged-in user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update transaction and recalculate total if amount or quantity changed
const updateTransaction = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.amount && updateData.quantity) {
      updateData.total = parseFloat(updateData.amount) * parseFloat(updateData.quantity);
    }

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
