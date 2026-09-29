import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  Users,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  ArrowUpRight,
  PlusCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Activity
} from "lucide-react";
import Loading from "../components/Loading";
import CampusNoticeboard from "../components/CampusNoticeboard";

const Dashboard = () => {
  const { user } = useAuth();
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
      title: "Enrolled Students",
      tagline: "Active Student Roster",
      value: stats.students,
      icon: Users,
      trend: "+8.4% this term",
      color: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:ring-blue-900/60",
      accent: "from-blue-600 to-indigo-600",
      link: "/students"
    },
    {
      title: "Academic Courses",
      tagline: "Active Programs",
      value: stats.courses,
      icon: BookOpen,
      trend: "100% Accredited",
      color: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 dark:ring-emerald-900/60",
      accent: "from-emerald-600 to-teal-600",
      link: "/courses"
    },
    {
      title: "Course Enrollments",
      tagline: "Admissions Recorded",
      value: stats.enrollments,
      icon: GraduationCap,
      trend: "Verified Records",
      color: "bg-violet-50 text-violet-600 ring-violet-100 dark:bg-violet-950/60 dark:text-violet-400 dark:ring-violet-900/60",
      accent: "from-violet-600 to-purple-600",
      link: "/enrollments"
    },
    {
      title: "Today's Attendance",
      tagline: "Session Headcount",
      value: stats.attendance,
      icon: CalendarCheck,
      trend: "Live Synchronized",
      color: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-950/60 dark:text-amber-400 dark:ring-amber-900/60",
      accent: "from-amber-500 to-orange-500",
      link: "/attendance"
    }
  ];

  if (loading) {
    return <Loading message="Loading ApexEdu intelligence hub..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 dark:text-blue-300 ring-1 ring-blue-700/20 dark:ring-blue-400/20">
              <Activity className="h-3 w-3 animate-pulse" />
              ApexEdu Intelligence • Live Session
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            Welcome back, {user?.name || "Academic User"} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time student metrics, curriculum enrollment status and campus activity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/attendance/mark"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg transition-all cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Mark Attendance</span>
          </Link>
          <Link
            to="/students/add"
            className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-slate-800 px-4 py-2.5 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-200/80 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all cursor-pointer shadow-2xs"
          >
            <PlusCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Enroll Student</span>
          </Link>
        </div>
      </div>

      {/* 4 Rebranded Metric Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 hover:shadow-xl dark:hover:shadow-slate-950/60 hover:ring-slate-300 dark:hover:ring-slate-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${card.color} shadow-2xs`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {card.tagline}
                  </span>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {card.title}
                  </p>
                  <p className="mt-1 text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                    {card.value}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2.5 text-[11px]">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {card.trend}
                </span>
                <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                  View &rarr;
                </span>
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

      {/* Quick Actions & Enterprise Engine Card */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Shortcuts */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Operational Shortcuts
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Direct Actions
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/students/add"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-2xs group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                <Users className="h-4 w-4" />
              </div>
              <span className="leading-tight">Enroll Student</span>
            </Link>

            <Link
              to="/courses/add"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all shadow-2xs group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="leading-tight">Create Course</span>
            </Link>

            <Link
              to="/enrollments/add"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 dark:hover:text-violet-300 hover:border-violet-200 dark:hover:border-violet-800 transition-all shadow-2xs group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="leading-tight">Allocate Batch</span>
            </Link>

            <Link
              to="/attendance/mark"
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-200 dark:hover:border-amber-800 transition-all shadow-2xs group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                <CalendarCheck className="h-4 w-4" />
              </div>
              <span className="leading-tight">Log Attendance</span>
            </Link>
          </div>
        </div>

        {/* ApexEdu Enterprise Engine Capsule */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-6 text-white shadow-xl shadow-blue-900/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                ApexEdu™ Enterprise Engine
              </span>
              <span className="text-[10px] font-mono text-blue-200">
                Release 2.6
              </span>
            </div>

            <h3 className="mt-4 text-xl font-display font-extrabold tracking-tight">
              Unified Academic Intelligence & Lifecycle Suite
            </h3>
            <p className="mt-2 text-xs text-blue-100/90 leading-relaxed">
              Equipped with digital student pass issuance, official bursar fee receipt generation,
              course banner media distribution, and role-enforced cryptographic session management.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-blue-200 border-t border-white/15 pt-4">
            <span className="text-[11px]">Authorized as: {user?.role === "admin" ? "Institutional Administrator" : "Faculty Staff"}</span>
            <Link
              to="/profile"
              className="font-bold text-white hover:text-blue-100 underline decoration-white/40 underline-offset-4"
            >
              Manage Profile &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
