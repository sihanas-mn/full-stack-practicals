import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// @desc    Upload profile picture for the authenticated user
// @route   POST /api/upload/profile-picture
// @access  Private (all users can upload for themselves)
router.post(
  "/profile-picture",
  protect,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image file to upload"
        });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.profilePicture = fileUrl;
      await user.save();

      res.json({
        success: true,
        message: "Profile picture uploaded successfully",
        profilePicture: fileUrl,
        user: {
          id: user._id,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Remove profile picture for the authenticated user
// @route   DELETE /api/upload/profile-picture
// @access  Private
router.delete("/profile-picture", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = "";
    await user.save();

    res.json({
      success: true,
      message: "Profile picture removed successfully",
      profilePicture: "",
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: ""
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Upload course banner image
// @route   POST /api/upload/course-banner
// @access  Private (Staff & Admin)
router.post(
  "/course-banner",
  protect,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select a course banner image to upload"
        });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      res.json({
        success: true,
        message: "Course banner uploaded successfully",
        url: fileUrl
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    General image upload
// @route   POST /api/upload
// @access  Private
router.post(
  "/",
  protect,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image file to upload"
        });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      res.json({
        success: true,
        url: fileUrl
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
