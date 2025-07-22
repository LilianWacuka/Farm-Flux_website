const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

const router = express.Router();
router.use(authMiddleware);

router.post('/', createTransaction);
router.get('/', getTransactions);

router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;