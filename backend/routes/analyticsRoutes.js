const express = require('express');
const auth = require('../middleware/authmiddleware');
const { getDashboardAnalytics, getMonthlyComparison } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/dashboard', auth, getDashboardAnalytics);
router.get('/comparison/:month1/:month2', auth, getMonthlyComparison);

module.exports = router;