const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    
    // Behavioral features
    meanDwellTime: { type: Number, default: 0 },  // Average key dwell time
    stdDwellTime: { type: Number, default: 0 },   // Standard deviation of key dwell time
    meanFlightTime: { type: Number, default: 0 }, // Average flight time
    stdFlightTime: { type: Number, default: 0 }   // Standard deviation of flight time
});

module.exports = mongoose.model('User', UserSchema);
