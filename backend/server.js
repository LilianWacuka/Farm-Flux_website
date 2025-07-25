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

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

// const __dirnamePath = __dirname;
// app.use(express.static(path.join(__dirnamePath, '/frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirnamePath, 'frontend', 'dist', 'index.html'));
// });


// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
