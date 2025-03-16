const mongoose = require('mongoose');
const ExamSessionSchema = new mongoose.Schema({
    sessionId: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    status: { type: String, enum: ['in_progress', 'completed', 'flagged'], default: 'in_progress' }
});

module.exports = mongoose.model('ExamSession', ExamSessionSchema);
