const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// GET all tickets (passenger + bus populated)
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('passenger', 'name phone email')
      .populate('bus', 'busNumber route capacity');
    res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('passenger', 'name phone email address')
      .populate('bus', 'busNumber route capacity status');
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST book a new ticket
router.post('/', async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    // Populate after creation for a full response
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('passenger', 'name phone email')
      .populate('bus', 'busNumber route');
    res.status(201).json({ success: true, message: 'Ticket booked successfully', data: populatedTicket });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update a ticket (e.g., change status or seat)
router.put('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('passenger', 'name phone email')
      .populate('bus', 'busNumber route');
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, message: 'Ticket updated successfully', data: ticket });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE (cancel) a ticket
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, message: 'Ticket cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

