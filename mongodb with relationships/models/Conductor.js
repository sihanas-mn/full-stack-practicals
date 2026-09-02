const mongoose = require('mongoose');

const conductorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Conductor name is required'],
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
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
    status: {
      type: String,
      enum: ['available', 'on-duty', 'off-duty'],
      default: 'available',
    },
    // Relationship: a conductor is assigned to one bus
    assignedBus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conductor', conductorSchema);

