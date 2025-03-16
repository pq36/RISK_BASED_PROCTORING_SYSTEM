const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    questionText: { type: String, required: true },
    questionType: { type: String, enum: ['MCQ', 'short_answer', 'long_answer'], required: true },
    options: { type: [String] }, // Only for MCQ
    correctAnswer: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
