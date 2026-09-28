import express from "express";
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
