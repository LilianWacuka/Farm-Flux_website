const Transaction = require('../models/Transaction');
const Farm = require('../models/Farm');
const {auth} = require('../middleware/authmiddleware')
const createObjectCsvWriter = require('csv-writer').createObjectCsvWriter;
const jsPDF = require('jspdf');
const { autoTable } = require('autotable');

// get weekly report
const getIncomeReport = async(req, res) =>{
    try {
      const incomes = await Transaction.find({
        type: 'income',
      }) 
       res.json(incomes)
    } catch (error) {
       console.error('Error generating monthly report:', error);
        res.status(500).json({ message: 'Internal server error' });
      
    }
};
const getExpenseReport = async(req, res)=>{
  try {
    const expenses = await Transaction.find({
      type: 'expense',
    })
    res.json(expenses)
    
  } catch (error) {
    console.error('Error getting expense reports:', error);
    res.status(500).json({ message: 'Internal server error'});
    
  }
};



module.exports = {
    getIncomeReport,
    getExpenseReport,
};
