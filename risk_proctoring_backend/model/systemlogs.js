const mongoose = require('mongoose');
const SystemLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    event: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    details: { type: mongoose.Schema.Types.Mixed } // Stores dynamic event data
});

module.exports = mongoose.model('SystemLog', SystemLogSchema);
