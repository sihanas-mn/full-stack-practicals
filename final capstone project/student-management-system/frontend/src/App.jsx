import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// App Pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import Enrollments from "./pages/Enrollments";
import AddEnrollment from "./pages/AddEnrollment";
import Attendance from "./pages/Attendance";
import MarkAttendance from "./pages/MarkAttendance";
import Profile from "./pages/Profile";
import Staff from "./pages/Staff";
import AddStaff from "./pages/AddStaff";
import Settings from "./pages/Settings";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes wrapped in Layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/add" element={<AddStudent />} />
                <Route path="/students/:id/edit" element={<EditStudent />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/staff/add" element={<AddStaff />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/add" element={<AddCourse />} />
                <Route path="/courses/:id/edit" element={<EditCourse />} />
                <Route path="/enrollments" element={<Enrollments />} />
                <Route path="/enrollments/add" element={<AddEnrollment />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/attendance/mark" element={<MarkAttendance />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Default Redirections */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
