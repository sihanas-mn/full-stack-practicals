const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Passenger name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Passenger', passengerSchema);

