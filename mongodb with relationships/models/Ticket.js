const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: [true, 'Ticket number is required'],
      unique: true,
      trim: true,
    },
    // Relationship: ticket belongs to a passenger
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Passenger',
      required: [true, 'Passenger is required'],
    },
    // Relationship: ticket belongs to a bus
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: [true, 'Bus is required'],
    },
    from: {
      type: String,
      required: [true, 'Departure location is required'],
      trim: true,
    },
    to: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    fare: {
      type: Number,
      required: [true, 'Fare is required'],
      min: [0, 'Fare cannot be negative'],
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required'],
    },
    seatNumber: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled', 'completed'],
      default: 'booked',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);

