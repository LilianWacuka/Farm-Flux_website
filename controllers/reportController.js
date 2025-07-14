const Transaction = require('../models/Transaction');
const Farm = require('../models/Farm');
const {auth} = require('../middleware/authmiddleware')
const createObjectCsvWriter = require('csv-writer').createObjectCsvWriter;
const jsPDF = require('jspdf');
const { autoTable } = require('autotable');

// get weekly report
const getWeeklyReport = async(req, res) =>{
    try {
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() -7 * 24 * 60 * 60 * 1000);

        const transactions = await Transaction.find({
            userId: req.user._id,
            date: { $gte: startDate, $lte: endDate }
        }).populate('farmId', 'farmName').lean();

        const totals = transactions.reduce((acc,t)=>{
            const amount = t.amount * t.quantity;
            if(t.type === 'expense') {
                acc.expense += amount;
            } else {
                acc.income += amount;
            }
            return acc;
        },{ expenses: 0, income: 0});
        totals.profit = totals.income - totals.expenses;

        const categoryBreakdown = transactions.reduce((acc, t) =>{
            const amount = t.amount * t.quantity;
            if (!acc[t.category]){
                acc[t.category] = { income: 0, expenses: 0 };
            }
            acc[t.category][t.type] += amount;
            return acc;
        },{})
        res.json({
            period: 'Weekly',
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            summary: totals,
            categoryBreakdown,
            transactions: transactions.map(t =>({
                ...t,
                totalAmount: t.amount * t.quantity,
                 formattedDate: new Date(t.date).toLocaleDateString()      
                 }))
        });
    } catch (error) {
        console.error('Error generating weekly report:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
};
// get monthly report
const getMonthlyReport = async(req, res)=> {
    try {
        const { year, month } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const transactions = await Transaction.find({
            userId: req.user._id,
            date: { $gte: startDate, $lte: endDate }
        }).populate('farmId', 'farmName').lean();

        const totals = transactions.reduce((acc, t) => {
            const amount = t.amount * t.quantity;
            if (t.type === 'expense') {
                acc.expenses += amount;
            } else {
                acc.income += amount;
            }
            return acc;
        }, { expenses: 0, income: 0 });
        totals.profit = totals.income - totals.expenses;

        const categoryBreakdown = transactions.reduce((acc, t) => {
            const amount = t.amount * t.quantity;
            if (!acc[t.category]) {
                acc[t.category] = { income: 0, expenses: 0 };
            }
            acc[t.category][t.type] += amount;
            return acc;
        }, {});

        res.json({
            period: 'Monthly',
            year,
            month,
            summary: totals,
            categoryBreakdown,
            transactions: transactions.map(t => ({
                ...t,
                totalAmount: t.amount * t.quantity,
                formattedDate: new Date(t.date).toLocaleDateString()
            }))
        });
    } catch (error) {
        console.error('Error generating monthly report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// getcustom report
const getCustomReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end }
    }).populate('farmId', 'farmName').lean();

    const totals = transactions.reduce((acc, t) => {
      const amount = t.amount * t.quantity;
      if (t.type === 'expense') {
        acc.expenses += amount;
      } else {
        acc.income += amount;
      }
      return acc;
    }, { expenses: 0, income: 0 });

    totals.profit = totals.income - totals.expenses;

    const categoryBreakdown = transactions.reduce((acc, t) => {
      const amount = t.amount * t.quantity;
      if (!acc[t.category]) {
        acc[t.category] = { expense: 0, income: 0 };
      }
      acc[t.category][t.type] += amount;
      return acc;
    }, {});

    res.json({
      period: 'Custom',
      startDate: startDate,
      endDate: endDate,
      summary: totals,
      categoryBreakdown,
      transactions: transactions.map(t => ({
        ...t,
        totalAmount: t.amount * t.quantity,
        formattedDate: new Date(t.date).toLocaleDateString()
      }))
    });
  } catch (error) {
    console.error('Custom report error:', error);
    res.status(500).json({ error: 'Server error while generating custom report' });
  }
};

//generate pdf report
function generatePDFReport(transactions, farms, startDate, endDate) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('FarmFlux Financial Report', 20, 20);
  doc.setFontSize(12);
  doc.text(`Period: ${startDate} to ${endDate}`, 20, 35);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 45);

  // Summary
  const totals = transactions.reduce((acc, t) => {
    const amount = t.amount * t.quantity;
    if (t.type === 'expense') {
      acc.expenses += amount;
    } else {
      acc.income += amount;
    }
    return acc;
  }, { expenses: 0, income: 0 });

  totals.profit = totals.income - totals.expenses;

  doc.setFontSize(14);
  doc.text('Summary', 20, 65);
  doc.setFontSize(10);
  doc.text(`Total Income: $${totals.income.toFixed(2)}`, 20, 80);
  doc.text(`Total Expenses: $${totals.expenses.toFixed(2)}`, 20, 90);
  doc.text(`Net Profit: $${totals.profit.toFixed(2)}`, 20, 100);

  // Transactions table
  let yPos = 120;
  doc.setFontSize(12);
  doc.text('Recent Transactions', 20, yPos);
  yPos += 10;

  doc.setFontSize(8);
  transactions.slice(0, 20).forEach((t, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    const amount = t.amount * t.quantity;
    const date = new Date(t.date).toLocaleDateString();
    const text = `${date} - ${t.name} (${t.category}) - $${amount.toFixed(2)}`;
    
    doc.text(text, 20, yPos);
    yPos += 5;
  });

  return doc.output('arraybuffer');
}

// Generate CSV report
async function generateCSVReport(transactions, startDate, endDate) {
  const csvWriter = createCsvWriter({
    path: 'temp-report.csv',
    header: [
      { id: 'date', title: 'Date' },
      { id: 'type', title: 'Type' },
      { id: 'name', title: 'Name' },
      { id: 'category', title: 'Category' },
      { id: 'amount', title: 'Amount' },
      { id: 'quantity', title: 'Quantity' },
      { id: 'totalAmount', title: 'Total Amount' },
      { id: 'farm', title: 'Farm' },
      { id: 'notes', title: 'Notes' }
    ]
  });

  const records = transactions.map(t => ({
    date: new Date(t.date).toLocaleDateString(),
    type: t.type,
    name: t.name,
    category: t.category,
    amount: t.amount,
    quantity: t.quantity,
    totalAmount: t.amount * t.quantity,
    farm: t.farmId?.farmName || 'N/A',
    notes: t.notes || ''
  }));

  await csvWriter.writeRecords(records);
  
  // Read the file and return content
  const fs = require('fs');
  const content = fs.readFileSync('temp-report.csv', 'utf8');
  fs.unlinkSync('temp-report.csv');
  
  return content;
}

// Export reports from csv and pdf and vice versa
const exportReport = async (req, res) => {
  try {
    const { format, transactions } = req.body;

    if (format === 'csv') {
      const csvWriter = createObjectCsvWriter({
        path: 'report.csv',
        header: [
          { id: 'type', title: 'Type' },
          { id: 'name', title: 'Name' },
          { id: 'category', title: 'Category' },
          { id: 'amount', title: 'Amount' },
          { id: 'quantity', title: 'Quantity' },
          { id: 'date', title: 'Date' },
        ],
      });

      await csvWriter.writeRecords(transactions);
      return res.download('report.csv');
    }

    if (format === 'pdf') {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [['Type', 'Name', 'Category', 'Amount', 'Quantity', 'Date']],
        body: transactions.map((tx) => [
          tx.type,
          tx.name,
          tx.category,
          tx.amount,
          tx.quantity,
          new Date(tx.date).toLocaleDateString(),
        ]),
      });

      const filePath = path.resolve('report.pdf');
      doc.save(filePath);
      return res.download(filePath);
    }

    res.status(400).json({ message: 'Unsupported format' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getWeeklyReport,
    getMonthlyReport,
    getCustomReport,
    exportReport,
};

