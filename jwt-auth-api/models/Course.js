const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      trim: true,
      uppercase: true
    },
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    instructor: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    credits: {
      type: Number,
      required: true,
      default: 3
    },
    duration: {
      type: String,
      default: "12 Weeks"
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    },
    status: {
      type: String,
      enum: ["Active", "Upcoming", "Archived"],
      default: "Active"
    },
    enrolledStudents: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
