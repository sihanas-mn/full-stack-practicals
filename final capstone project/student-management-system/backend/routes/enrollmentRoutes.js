import express from "express";
import {
  getEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
} from "../controllers/enrollmentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getEnrollments);
router.post("/", createEnrollment);
router.get("/:id", getEnrollment);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
