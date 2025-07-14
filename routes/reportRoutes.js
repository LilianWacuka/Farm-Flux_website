const express = require('express');
const middleware = require('../middleware/authmiddleware');
const {
    getWeeklyReport,
    getMonthlyReport,
    getCustomReport,
    exportReport,
} = require('../controllers/reportController');

const router = express.Router();
router.use(middleware);

// API routes for reports
router.get('/weekly', getWeeklyReport);
router.get('/monthly/:year/:month', getMonthlyReport);
router.post('/custom/:startDate/:endDate', getCustomReport);
router.get('/export', exportReport);

module.exports = router;