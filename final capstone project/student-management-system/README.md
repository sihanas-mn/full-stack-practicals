# MERN Student Management System

A full-stack Student Management System built using the MERN stack with modern UI aesthetics, robust CRUD functionality, database relationships, and secure httpOnly cookie-based JWT authentication.

---

## 🛠️ Technology Stack

### Frontend
- **React 19** with **Vite**
- **Tailwind CSS v4** for modern dashboard design
- **React Router DOM v7** for single-page routing & protected route management
- **Axios** with `withCredentials: true`
- **Lucide React** for icons

### Backend
- **Node.js** & **Express.js** (ES Modules)
- **MongoDB** & **Mongoose**
- **JWT (JSON Web Tokens)**
- **bcryptjs** for password encryption
- **cookie-parser** for httpOnly authentication cookies
- **CORS** configured for credentialed requests
- **dotenv**

---

## 🔒 Authentication Security Model
- **httpOnly Cookies**: The JWT token is securely stored in an HTTP-Only cookie, preventing access via JavaScript / XSS.
- **No Client Token Storage**: No tokens stored in `localStorage` or `sessionStorage`.
- **No Manual Bearer Headers**: The browser automatically sends authentication cookies on every API request.
- **Production-Ready Cookies**: `secure` and `sameSite` parameters adapt to development and production environments.

---

## 📁 Project Structure

```text
student-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── attendanceController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── attendanceRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── Loading.jsx
    │   │   ├── ConfirmModal.jsx
    │   │   └── Layout.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Students.jsx
    │   │   ├── AddStudent.jsx
    │   │   ├── EditStudent.jsx
    │   │   ├── Courses.jsx
    │   │   ├── AddCourse.jsx
    │   │   ├── EditCourse.jsx
    │   │   ├── Enrollments.jsx
    │   │   ├── AddEnrollment.jsx
    │   │   ├── Attendance.jsx
    │   │   ├── MarkAttendance.jsx
    │   │   └── Profile.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    └── vite.config.js
```

---

## 🔑 Default Login Credentials

After seeding the database, you can log in using either of the following accounts:

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@example.com` | `password123` |
| **Staff Member** | `staff@example.com` | `password123` |

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd student-management-system/backend
npm install
npm run seed     # Seeds realistic sample data into all 5 collections
npm run dev      # Starts the backend server
```
Backend runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd student-management-system/frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new admin/staff user
- `POST /api/auth/login` - Authenticate and set httpOnly cookie
- `POST /api/auth/logout` - Clear authentication cookie
- `GET /api/auth/me` - Get current session user

### Students
- `GET /api/students` - Query students (search, status filter, pagination)
- `POST /api/students` - Register a new student
- `GET /api/students/:id` - Fetch single student profile
- `PUT /api/students/:id` - Update student profile
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - List courses (search, status filter)
- `POST /api/courses` - Add new course module
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course details
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments` - List all enrollments with populated student & course info
- `POST /api/enrollments` - Enroll student into course & batch
- `GET /api/enrollments/:id` - Get single enrollment details
- `PUT /api/enrollments/:id` - Update enrollment
- `DELETE /api/enrollments/:id` - Delete enrollment

### Attendance
- `GET /api/attendance` - Query attendance records (filter by date, course, student, status)
- `POST /api/attendance` - Mark attendance with duplicate prevention
- `GET /api/attendance/:id` - Get attendance record
- `PUT /api/attendance/:id` - Update attendance record
- `DELETE /api/attendance/:id` - Delete attendance record
