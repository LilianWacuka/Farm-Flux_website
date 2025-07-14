import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm'},
    name: { type: String},
    amount: Number,
    category: String,
    quantity: Number,
    date: { type: Date, default: Date.now },
    notes: String,
}, { timestamps: true }
);
export default mongoose.model('Transaction', transactionSchema);