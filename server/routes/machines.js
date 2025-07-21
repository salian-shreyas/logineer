const express = require('express');
const Machine = require('../models/Machine');
const router = express.Router();

// Get machine info by QR ID
router.get('/:qrId', async (req, res) => {
  try {
    const machine = await Machine.findOne({ qrId: req.params.qrId });
    if (!machine) return res.status(404).json({ message: "Machine not found" });
    res.json(machine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
