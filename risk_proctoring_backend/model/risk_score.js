const mongoose = require('mongoose');
const RiskScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    sessionId: { type: String, required: true },
    riskScore: { type: Number, min: 0, max: 100, required: true },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RiskScore', RiskScoreSchema);
