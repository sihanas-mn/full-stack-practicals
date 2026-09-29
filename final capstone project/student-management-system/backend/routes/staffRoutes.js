import express from "express";
import {
  getStaffMembers,
  getStaffMember,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember
} from "../controllers/staffController.js";
import protect, { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getStaffMembers);
router.get("/:id", getStaffMember);
router.post("/", adminOnly, createStaffMember);
router.put("/:id", adminOnly, updateStaffMember);
router.delete("/:id", adminOnly, deleteStaffMember);

export default router;
