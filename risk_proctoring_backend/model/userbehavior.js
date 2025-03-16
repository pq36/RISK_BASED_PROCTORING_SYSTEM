const mongoose = require('mongoose');
const UserBehaviorLogSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    mouseActivity: [{ timestamp: Date, event: String, x: Number, y: Number }],
    keystrokes: [{ timestamp: Date, key: String }],
    tabSwitches: [{ timestamp: Date, previousTab: String, newTab: String }],
    inactivityPeriods: [{ startTime: Date, endTime: Date }]
});

module.exports = mongoose.model('UserBehaviorLog', UserBehaviorLogSchema);
