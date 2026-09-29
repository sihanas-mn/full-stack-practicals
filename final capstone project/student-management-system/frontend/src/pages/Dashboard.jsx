import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  Users,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  ArrowUpRight,
  PlusCircle,
  Clock,
  Sparkles
} from "lucide-react";
import Loading from "../components/Loading";
import CampusNoticeboard from "../components/CampusNoticeboard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
    attendance: 0
  });
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const todayString = new Date().toISOString().split("T")[0];
      const [
        studentsResponse,
        coursesResponse,
        enrollmentResponse,
        attendanceResponse
      ] = await Promise.all([
        api.get("/students?limit=1"),
        api.get("/courses"),
        api.get("/enrollments"),
        api.get(`/attendance?date=${todayString}`)
      ]);

      setStats({
        students: studentsResponse.data.pagination?.total || 0,
        courses: coursesResponse.data.courses?.length || 0,
        enrollments: enrollmentResponse.data.enrollments?.length || 0,
        attendance: attendanceResponse.data.attendance?.length || 0
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Total Students",
      value: stats.students,
      icon: Users,
      color: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:ring-blue-900/60",
      accent: "from-blue-600 to-indigo-600",
      link: "/students"
    },
    {
      title: "Total Courses",
      value: stats.courses,
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 dark:ring-emerald-900/60",
      accent: "from-emerald-600 to-teal-600",
      link: "/courses"
    },
    {
      title: "Total Enrollments",
      value: stats.enrollments,
      icon: GraduationCap,
      color: "bg-violet-50 text-violet-600 ring-violet-100 dark:bg-violet-950/60 dark:text-violet-400 dark:ring-violet-900/60",
      accent: "from-violet-600 to-purple-600",
      link: "/enrollments"
    },
    {
      title: "Today's Attendance",
      value: stats.attendance,
      icon: CalendarCheck,
      color: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-950/60 dark:text-amber-400 dark:ring-amber-900/60",
      accent: "from-amber-500 to-orange-500",
      link: "/attendance"
    }
  ];

  if (loading) {
    return <Loading message="Loading dashboard insights..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            System Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Live metrics, student records and active academic activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/attendance/mark"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Mark Attendance</span>
          </Link>
          <Link
            to="/students/add"
            className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all cursor-pointer"
          >
            <PlusCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>New Student</span>
          </Link>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-800 hover:shadow-lg dark:hover:shadow-slate-950/50 hover:ring-slate-300 dark:hover:ring-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${card.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {card.value}
                </p>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </Link>
          );
        })}
      </div>

      {/* Campus Noticeboard & Official Announcements */}
      <CampusNoticeboard />

      {/* Quick Actions & Helpful Shortcuts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Quick Shortcuts
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/students/add"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
            >
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Enroll New Student</span>
            </Link>
            <Link
              to="/courses/add"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
            >
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Add New Course</span>
            </Link>
            <Link
              to="/enrollments/add"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 dark:hover:text-violet-300 hover:border-violet-200 dark:hover:border-violet-800 transition-colors"
            >
              <GraduationCap className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span>Course Enrollment</span>
            </Link>
            <Link
              to="/attendance/mark"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-200 dark:hover:border-amber-800 transition-colors"
            >
              <CalendarCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Take Attendance</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 p-6 text-white shadow-md shadow-blue-500/10 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
              <Clock className="h-3.5 w-3.5" />
              Active Academic Session
            </span>
            <h3 className="mt-4 text-xl font-bold">
              Standard MERN Student Management
            </h3>
            <p className="mt-2 text-sm text-blue-100 dark:text-blue-200 leading-relaxed">
              Full database relationships across Students, Courses, Enrollments,
              and daily Attendance verification with secure httpOnly cookie authentication.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-blue-200 dark:text-blue-300 border-t border-white/10 pt-4">
            <span>Role: Administrator / Staff</span>
            <Link
              to="/profile"
              className="underline font-semibold text-white hover:text-blue-100"
            >
              View Profile &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
