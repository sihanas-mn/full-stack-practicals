const express = require('express');
const router = express.Router();
const Conductor = require('../models/Conductor');

// GET all conductors (with assigned bus populated)
router.get('/', async (req, res) => {
  try {
    const conductors = await Conductor.find().populate('assignedBus', 'busNumber route status');
    res.status(200).json({ success: true, count: conductors.length, data: conductors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single conductor by ID
router.get('/:id', async (req, res) => {
  try {
    const conductor = await Conductor.findById(req.params.id).populate('assignedBus', 'busNumber route status');
    if (!conductor) {
      return res.status(404).json({ success: false, message: 'Conductor not found' });
    }
    res.status(200).json({ success: true, data: conductor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a new conductor
router.post('/', async (req, res) => {
  try {
    const conductor = await Conductor.create(req.body);
    res.status(201).json({ success: true, message: 'Conductor created successfully', data: conductor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update a conductor
router.put('/:id', async (req, res) => {
  try {
    const conductor = await Conductor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('assignedBus', 'busNumber route status');
    if (!conductor) {
      return res.status(404).json({ success: false, message: 'Conductor not found' });
    }
    res.status(200).json({ success: true, message: 'Conductor updated successfully', data: conductor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE a conductor
router.delete('/:id', async (req, res) => {
  try {
    const conductor = await Conductor.findByIdAndDelete(req.params.id);
    if (!conductor) {
      return res.status(404).json({ success: false, message: 'Conductor not found' });
    }
    res.status(200).json({ success: true, message: 'Conductor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

