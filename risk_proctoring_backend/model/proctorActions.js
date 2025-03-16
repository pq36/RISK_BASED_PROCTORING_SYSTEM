const mongoose = require('mongoose');
const ProctorActionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    riskScore: { type: Number, required: true },
    actionTaken: { type: String, enum: ['warning', 'lock_exam', 'flag_for_review'], required: true },
    comments: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProctorAction', ProctorActionSchema);
