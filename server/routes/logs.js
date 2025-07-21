const express = require('express');
const MaintenanceLog = require('../models/MaintenanceLog');
const Machine = require('../models/Machine');
const router = express.Router();

// Log a maintenance activity
router.post('/', async (req, res) => {
  const { qrId, technicianName, remarks, nextMaintenanceDate } = req.body;
  try {
    const machine = await Machine.findOne({ qrId });
    if (!machine) return res.status(404).json({ message: "Machine not found" });

    const log = new MaintenanceLog({ machine: machine._id, technicianName, remarks });
    await log.save();

    machine.lastMaintenanceDate = new Date();
    machine.nextMaintenanceDate = new Date(nextMaintenanceDate);
    await machine.save();

    res.status(201).json({ message: "Log saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get logs for a machine
router.get('/:qrId', async (req, res) => {
  try {
    const machine = await Machine.findOne({ qrId: req.params.qrId });
    if (!machine) return res.status(404).json({ message: "Machine not found" });

    const logs = await MaintenanceLog.find({ machine: machine._id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
