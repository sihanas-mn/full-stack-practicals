const express = require("express");
const { register, login } = require("../controllers/authController");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");

const Course = require("../models/Course");
const Dashboard = require("../models/Dashboard");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Protected profile data",
    user: req.user
  });
});

router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    const stats = await Dashboard.find({ isActive: true });
    res.json({
      message: "Access granted: You are viewing protected dashboard data with a valid JWT.",
      user: req.user,
      metricsCount: stats.length,
      metrics: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
});

router.get("/courses", authenticateToken, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      message: "Courses retrieved successfully with valid JWT.",
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

router.get("/admin", authenticateToken,  authorizeRole("admin"), (req, res) => {
  res.json({
    message: "Welcome to the admin-only route",
    user: req.user
  });
});

module.exports = router;