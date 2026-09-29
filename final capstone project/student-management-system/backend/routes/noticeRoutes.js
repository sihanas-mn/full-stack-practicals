import express from "express";
import {
  getNotices,
  createNotice,
  deleteNotice
} from "../controllers/noticeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getNotices);
router.post("/", createNotice);
router.delete("/:id", deleteNotice);

export default router;
