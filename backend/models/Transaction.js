const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm'},
    name: { type: String},
    amount: Number,
    category: String,
    quantity: Number,
    total: Number,
    type: String,
    date: { type: Date, default: Date.now },
    notes: String,
}, { timestamps: true }
);
module.exports = mongoose.model('Transaction', transactionSchema);