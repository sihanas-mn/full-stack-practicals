const express = require('express');
const router = express.Router();
const Passenger = require('../models/Passenger');
const Ticket = require('../models/Ticket');

// GET all passengers
router.get('/', async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.status(200).json({ success: true, count: passengers.length, data: passengers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single passenger with their tickets
router.get('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger) {
      return res.status(404).json({ success: false, message: 'Passenger not found' });
    }
    // Fetch all tickets linked to this passenger
    const tickets = await Ticket.find({ passenger: req.params.id }).populate('bus', 'busNumber route');
    res.status(200).json({ success: true, data: { passenger, tickets } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a new passenger
router.post('/', async (req, res) => {
  try {
    const passenger = await Passenger.create(req.body);
    res.status(201).json({ success: true, message: 'Passenger created successfully', data: passenger });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update a passenger
router.put('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!passenger) {
      return res.status(404).json({ success: false, message: 'Passenger not found' });
    }
    res.status(200).json({ success: true, message: 'Passenger updated successfully', data: passenger });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE a passenger
router.delete('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!passenger) {
      return res.status(404).json({ success: false, message: 'Passenger not found' });
    }
    res.status(200).json({ success: true, message: 'Passenger deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

