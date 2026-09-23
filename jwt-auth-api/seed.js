require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");
const Dashboard = require("./models/Dashboard");

const sampleCourses = [
  {
    courseCode: "CS101",
    title: "Introduction to Computer Science",
    description: "Foundational concepts of computing, algorithms, and problem-solving using Python.",
    instructor: "Dr. Alan Turing",
    department: "Computer Science",
    credits: 4,
    duration: "14 Weeks",
    level: "Beginner",
    status: "Active",
    enrolledStudents: 120
  },
  {
    courseCode: "WEB201",
    title: "Full-Stack Web Development",
    description: "Master modern web development with Node.js, Express, React, and MongoDB.",
    instructor: "Prof. Sarah Connor",
    department: "Software Engineering",
    credits: 3,
    duration: "12 Weeks",
    level: "Intermediate",
    status: "Active",
    enrolledStudents: 85
  },
  {
    courseCode: "AI301",
    title: "Artificial Intelligence & Neural Networks",
    description: "Deep dive into machine learning models, deep neural networks, and computer vision.",
    instructor: "Dr. Geoffrey Hinton",
    department: "Artificial Intelligence",
    credits: 4,
    duration: "16 Weeks",
    level: "Advanced",
    status: "Active",
    enrolledStudents: 60
  },
  {
    courseCode: "SEC205",
    title: "Network Security & Cryptography",
    description: "Exploration of encryption, public key infrastructure, JWT authentication, and secure protocols.",
    instructor: "Prof. Bruce Schneier",
    department: "Cyber Security",
    credits: 3,
    duration: "10 Weeks",
    level: "Intermediate",
    status: "Upcoming",
    enrolledStudents: 45
  },
  {
    courseCode: "DB102",
    title: "Database Management & NoSQL Systems",
    description: "Relational and document-oriented database design, indexing, and performance tuning with MongoDB.",
    instructor: "Dr. Edgar Codd",
    department: "Computer Science",
    credits: 3,
    duration: "12 Weeks",
    level: "Beginner",
    status: "Active",
    enrolledStudents: 95
  }
];

const sampleDashboardWidgets = [
  {
    widgetName: "Total Enrolled Students",
    metricKey: "total_enrolled_students",
    title: "Enrolled Students",
    value: 405,
    changePercentage: 12.5,
    trend: "up",
    category: "Users",
    icon: "users",
    description: "Total active student enrollments across all faculties",
    isActive: true
  },
  {
    widgetName: "Active Courses",
    metricKey: "active_courses_count",
    title: "Active Courses",
    value: 4,
    changePercentage: 5.0,
    trend: "up",
    category: "Courses",
    icon: "book-open",
    description: "Courses currently published and open for registration",
    isActive: true
  },
  {
    widgetName: "Average Course Completion",
    metricKey: "avg_completion_rate",
    title: "Completion Rate",
    value: "87.4%",
    changePercentage: 3.2,
    trend: "up",
    category: "Analytics",
    icon: "award",
    description: "Average graduation / course completion rate",
    isActive: true
  },
  {
    widgetName: "System Health & Uptime",
    metricKey: "system_uptime",
    title: "System Uptime",
    value: "99.98%",
    changePercentage: 0,
    trend: "neutral",
    category: "System",
    icon: "activity",
    description: "API server and database operational availability",
    isActive: true
  },
  {
    widgetName: "Monthly Revenue",
    metricKey: "monthly_revenue",
    title: "Monthly Revenue",
    value: "$24,500",
    changePercentage: 8.4,
    trend: "up",
    category: "Finance",
    icon: "dollar-sign",
    description: "Course fee revenue collected in the current calendar month",
    isActive: true
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jwt_auth_db";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // Populate Course collection (clear existing courses only, leave User collection intact)
    await Course.deleteMany({});
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`Successfully populated ${createdCourses.length} courses into the 'courses' collection.`);

    // Populate Dashboard collection (clear existing dashboard items only, leave User collection intact)
    await Dashboard.deleteMany({});
    const createdWidgets = await Dashboard.insertMany(sampleDashboardWidgets);
    console.log(`Successfully populated ${createdWidgets.length} dashboard metrics into the 'dashboards' collection.`);

    console.log("Populating complete! User collection was preserved untouched.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
