const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// GET all buses (with conductor populated)
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find().populate('conductor', 'name licenseNumber phone status');
    res.status(200).json({ success: true, count: buses.length, data: buses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single bus by ID
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('conductor', 'name licenseNumber phone status');
    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a new bus
router.post('/', async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json({ success: true, message: 'Bus created successfully', data: bus });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update a bus
router.put('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('conductor', 'name licenseNumber phone status');
    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    res.status(200).json({ success: true, message: 'Bus updated successfully', data: bus });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE a bus
router.delete('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    res.status(200).json({ success: true, message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

