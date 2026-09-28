import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Student from "./models/Student.js";
import Course from "./models/Course.js";
import Enrollment from "./models/Enrollment.js";
import Attendance from "./models/Attendance.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_management";

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB at:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully!");

    // Clear existing collections
    console.log("Clearing existing data...");
    await Promise.all([
      User.deleteMany({}),
      Student.deleteMany({}),
      Course.deleteMany({}),
      Enrollment.deleteMany({}),
      Attendance.deleteMany({})
    ]);

    // 1. Seed Users (pre-save hook hashes the password)
    console.log("Seeding Users...");
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin"
    });

    const staffUser = await User.create({
      name: "Sarah Jenkins",
      email: "staff@example.com",
      password: "password123",
      role: "staff"
    });

    console.log(`Created 2 users: ${adminUser.email} (admin), ${staffUser.email} (staff)`);

    // 2. Seed Students
    console.log("Seeding Students...");
    const studentsData = [
      {
        studentId: "STU001",
        firstName: "John",
        lastName: "Perera",
        email: "john.perera@example.com",
        phone: "0771234567",
        gender: "Male",
        dateOfBirth: new Date("2002-05-15"),
        address: "No. 42, Temple Road, Kandy",
        guardianName: "Mr. Sunil Perera",
        guardianPhone: "0777654321",
        status: "Active"
      },
      {
        studentId: "STU002",
        firstName: "Amaya",
        lastName: "Fernando",
        email: "amaya.fernando@example.com",
        phone: "0718899221",
        gender: "Female",
        dateOfBirth: new Date("2003-09-12"),
        address: "15/B Park Street, Colombo 03",
        guardianName: "Mrs. Nirosha Fernando",
        guardianPhone: "0719988776",
        status: "Active"
      },
      {
        studentId: "STU003",
        firstName: "David",
        lastName: "Silva",
        email: "david.silva@example.com",
        phone: "0763344556",
        gender: "Male",
        dateOfBirth: new Date("2001-11-28"),
        address: "78 Galle Road, Mount Lavinia",
        guardianName: "Mr. Victor Silva",
        guardianPhone: "0765544332",
        status: "Active"
      },
      {
        studentId: "STU004",
        firstName: "Kavindi",
        lastName: "Senanayake",
        email: "kavindi.s@example.com",
        phone: "0751122445",
        gender: "Female",
        dateOfBirth: new Date("2002-03-08"),
        address: "102 Station Road, Gampaha",
        guardianName: "Dr. Asela Senanayake",
        guardianPhone: "0759988112",
        status: "Active"
      },
      {
        studentId: "STU005",
        firstName: "Nuwan",
        lastName: "Jayasinghe",
        email: "nuwan.j@example.com",
        phone: "0784455667",
        gender: "Male",
        dateOfBirth: new Date("2002-12-04"),
        address: "55 Circular Road, Kurunegala",
        guardianName: "Mr. Nihal Jayasinghe",
        guardianPhone: "0781122334",
        status: "Active"
      },
      {
        studentId: "STU006",
        firstName: "Ryan",
        lastName: "De Mel",
        email: "ryan.demel@example.com",
        phone: "0727788990",
        gender: "Male",
        dateOfBirth: new Date("2001-07-22"),
        address: "24 Beach Road, Negombo",
        guardianName: "Mrs. Charmaine De Mel",
        guardianPhone: "0723344556",
        status: "Inactive"
      }
    ];

    const createdStudents = await Student.insertMany(studentsData);
    console.log(`Created ${createdStudents.length} students.`);

    // 3. Seed Courses
    console.log("Seeding Courses...");
    const coursesData = [
      {
        courseCode: "MERN001",
        courseName: "MERN Stack Web Development",
        description: "Comprehensive full-stack training covering MongoDB, Express, React, and Node.js with real-world deployments.",
        duration: "6 Months",
        fee: 75000,
        status: "Active"
      },
      {
        courseCode: "PY101",
        courseName: "Python & Data Science Fundamentals",
        description: "Master Python programming, NumPy, Pandas, Data Visualization, and introductory Machine Learning models.",
        duration: "4 Months",
        fee: 55000,
        status: "Active"
      },
      {
        courseCode: "MOB201",
        courseName: "React Native Mobile App Development",
        description: "Build cross-platform iOS and Android mobile applications using React Native, Expo, and native APIs.",
        duration: "5 Months",
        fee: 68000,
        status: "Active"
      },
      {
        courseCode: "UIUX101",
        courseName: "UI/UX Design Masterclass",
        description: "User research, wireframing, interactive prototyping in Figma, and design system engineering.",
        duration: "3 Months",
        fee: 40000,
        status: "Active"
      }
    ];

    const createdCourses = await Course.insertMany(coursesData);
    console.log(`Created ${createdCourses.length} courses.`);

    // 4. Seed Enrollments
    console.log("Seeding Enrollments...");
    const enrollmentsData = [
      {
        student: createdStudents[0]._id, // John Perera
        course: createdCourses[0]._id,   // MERN001
        batch: "B001",
        enrollmentDate: new Date("2026-08-01"),
        status: "Active"
      },
      {
        student: createdStudents[1]._id, // Amaya Fernando
        course: createdCourses[0]._id,   // MERN001
        batch: "B001",
        enrollmentDate: new Date("2026-08-01"),
        status: "Active"
      },
      {
        student: createdStudents[2]._id, // David Silva
        course: createdCourses[0]._id,   // MERN001
        batch: "B001",
        enrollmentDate: new Date("2026-08-05"),
        status: "Active"
      },
      {
        student: createdStudents[3]._id, // Kavindi Senanayake
        course: createdCourses[1]._id,   // PY101
        batch: "PY-01",
        enrollmentDate: new Date("2026-08-10"),
        status: "Active"
      },
      {
        student: createdStudents[4]._id, // Nuwan Jayasinghe
        course: createdCourses[1]._id,   // PY101
        batch: "PY-01",
        enrollmentDate: new Date("2026-08-12"),
        status: "Active"
      },
      {
        student: createdStudents[0]._id, // John Perera also taking UI/UX
        course: createdCourses[3]._id,   // UIUX101
        batch: "DES-02",
        enrollmentDate: new Date("2026-08-15"),
        status: "Active"
      },
      {
        student: createdStudents[5]._id, // Ryan De Mel
        course: createdCourses[2]._id,   // MOB201
        batch: "M01",
        enrollmentDate: new Date("2026-06-01"),
        status: "Completed"
      }
    ];

    const createdEnrollments = await Enrollment.insertMany(enrollmentsData);
    console.log(`Created ${createdEnrollments.length} enrollments.`);

    // 5. Seed Attendance
    console.log("Seeding Attendance records...");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const attendanceRecords = [
      // Today's attendance for MERN001
      {
        student: createdStudents[0]._id,
        course: createdCourses[0]._id,
        date: today,
        status: "Present",
        remarks: "Attended full practical session"
      },
      {
        student: createdStudents[1]._id,
        course: createdCourses[0]._id,
        date: today,
        status: "Present",
        remarks: "Active participation in lab"
      },
      {
        student: createdStudents[2]._id,
        course: createdCourses[0]._id,
        date: today,
        status: "Late",
        remarks: "Joined 15 minutes late due to traffic"
      },

      // Today's attendance for PY101
      {
        student: createdStudents[3]._id,
        course: createdCourses[1]._id,
        date: today,
        status: "Present",
        remarks: "Completed Jupyter notebook exercises"
      },
      {
        student: createdStudents[4]._id,
        course: createdCourses[1]._id,
        date: today,
        status: "Absent",
        remarks: "Reported medical leave"
      },

      // Yesterday's attendance for MERN001
      {
        student: createdStudents[0]._id,
        course: createdCourses[0]._id,
        date: yesterday,
        status: "Present",
        remarks: "On time"
      },
      {
        student: createdStudents[1]._id,
        course: createdCourses[0]._id,
        date: yesterday,
        status: "Late",
        remarks: "Arrived at 9:15 AM"
      },
      {
        student: createdStudents[2]._id,
        course: createdCourses[0]._id,
        date: yesterday,
        status: "Present",
        remarks: "On time"
      }
    ];

    const createdAttendance = await Attendance.insertMany(attendanceRecords);
    console.log(`Created ${createdAttendance.length} attendance records.`);

    console.log("\n==========================================");
    console.log("DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    console.log("==========================================");
    console.log("ADMIN LOGIN CREDENTIALS:");
    console.log("  Email:    admin@example.com");
    console.log("  Password: password123");
    console.log("------------------------------------------");
    console.log("STAFF LOGIN CREDENTIALS:");
    console.log("  Email:    staff@example.com");
    console.log("  Password: password123");
    console.log("==========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error);
    process.exit(1);
  }
};

seedDatabase();
