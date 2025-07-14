const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const getDashboardAnalytics = async (req, res)=> {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        const summary = await Transaction.aggregate([
            { $match: { userId, date: { $gte: currentMonthStart } } },
        { $group: {
            _id: '$type',
            total: { $sum: { $multiply: [ '$amount', '$quantity' ] } },

        }},
        ]);
        const lineData = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type',
          },
          total: { $sum: { $multiply: ['$amount', '$quantity'] } },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json({ summary, pieData, lineData });
  } catch (err) {
    console.error('Dashboard analytics error:', err);
    res.status(500).json({ message: 'Error loading dashboard analytics' });
  }
};
const getMonthlyComparison = async (req, res) => {
  try {
    const { month1, month2 } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const currentYear = new Date().getFullYear();

    const data = await Transaction.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: new Date(currentYear, Math.min(month1, month2) - 1, 1),
            $lt: new Date(currentYear, Math.max(month1, month2), 1),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            type: '$type',
            category: '$category',
          },
          total: { $sum: { $multiply: ['$amount', '$quantity'] } },
        },
      },
      { $sort: { '_id.month': 1 } },
    ]);

    } catch (error) {
        console.error('Error generating monthly comparison:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
module.exports = { getDashboardAnalytics, getMonthlyComparison };