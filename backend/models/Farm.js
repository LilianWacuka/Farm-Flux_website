const mongoose = require('mongoose');
const farmSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    farmName: { type: String },
    poultryTypes: [String],
    startDate: { type: Date, default: Date.now },
}, { timestamps: true }
);
module.exports = mongoose.model('Farm', farmSchema);