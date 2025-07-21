const mongoose = require('mongoose');

const MaintenanceLogSchema = new mongoose.Schema({
  machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
  technicianName: String,
  date: { type: Date, default: Date.now },
  remarks: String
});

module.exports = mongoose.model('MaintenanceLog', MaintenanceLogSchema);
