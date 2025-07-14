const Transaction = require('../models/Transaction');

const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, userId: req.user._id });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTransaction, getTransactions, updateTransaction, deleteTransaction };