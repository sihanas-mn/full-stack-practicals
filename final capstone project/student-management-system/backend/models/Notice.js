import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["Academic", "Exam", "Urgent", "Event", "General"],
      default: "General"
    },
    priority: {
      type: String,
      enum: ["Normal", "High", "Urgent"],
      default: "Normal"
    },
    postedBy: {
      type: String,
      default: "Academic Registry"
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
