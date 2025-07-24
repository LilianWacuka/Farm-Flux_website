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

app.use(cors);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => res.send('Backend is running successfully'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
