const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: [true, 'Bus number is required'],
      unique: true,
      trim: true,
    },
    route: {
      type: String,
      required: [true, 'Route is required'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active',
    },
    // Relationship: a bus has one conductor assigned
    conductor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conductor',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bus', busSchema);

