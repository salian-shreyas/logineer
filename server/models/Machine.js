const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  qrId: { type: String, required: true, unique: true },
  name: String,
  location: String,
  lastMaintenanceDate: Date,
  nextMaintenanceDate: Date,
});

module.exports = mongoose.model('Machine', MachineSchema);
