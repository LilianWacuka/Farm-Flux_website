const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const farmRoutes = require('./routes/farmRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const reportRoutes = require('./routes/reportRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ Updated CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://farm-flux-website-3qls.onrender.com',
  'https://farm-flux-website.onrender.com'
];

app.use(cors());
app.use(express());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// ✅ Catch-all: send index.html for any non-API route
app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
