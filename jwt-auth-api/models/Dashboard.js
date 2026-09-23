const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema(
  {
    widgetName: {
      type: String,
      required: true,
      trim: true
    },
    metricKey: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    changePercentage: {
      type: Number,
      default: 0
    },
    trend: {
      type: String,
      enum: ["up", "down", "neutral"],
      default: "neutral"
    },
    category: {
      type: String,
      enum: ["Analytics", "Finance", "Users", "Courses", "System"],
      default: "Analytics"
    },
    icon: {
      type: String,
      default: "bar-chart"
    },
    description: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dashboard", dashboardSchema);
