import express from "express";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getCourses);
router.post("/", createCourse);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
