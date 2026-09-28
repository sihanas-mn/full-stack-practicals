import express from "express";
import {
  getAttendance,
  getAttendanceRecord,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendanceController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAttendance);
router.post("/", createAttendance);
router.get("/:id", getAttendanceRecord);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
