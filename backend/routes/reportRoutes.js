const express = require('express');
const middleware = require('../middleware/authmiddleware');
const {getIncomeReport, getExpenseReport} = require('../controllers/reportController')

const router = express.Router();
router.use(middleware);
router.get('/income', getIncomeReport)
router.get('/expense', getExpenseReport)
module.exports = router;