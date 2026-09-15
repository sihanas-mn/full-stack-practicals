import React from "react";
import { Link } from "react-router-dom";
import {
  School,
  Users,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Database,
  CheckCircle,
} from "lucide-react";
import { useTeachers } from "../hooks/useTeachers";
import { useStudents } from "../hooks/useStudents";
import { useSubjects } from "../hooks/useSubjects";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { getEntityId } from "../utils/strapiNormalize";

export default function OverviewPage() {
  const { data: teachers = [], isLoading: loadingTeachers } = useTeachers();
  const { data: students = [], isLoading: loadingStudents } = useStudents();
  const { data: subjects = [], isLoading: loadingSubjects } = useSubjects();

  const isLoading = loadingTeachers || loadingStudents || loadingSubjects;

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" text="Gathering school metrics..." />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Faculty",
      count: teachers.length,
      unit: "Teachers",
      icon: School,
      bgColor: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-700 border-blue-200",
      link: "/teachers",
    },
    {
      title: "Total Students",
      count: students.length,
      unit: "Enrolled",
      icon: Users,
      bgColor: "bg-emerald-500",
      lightColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      link: "/students",
    },
    {
      title: "Curriculum Subjects",
      count: subjects.length,
      unit: "Active Courses",
      icon: BookOpen,
      bgColor: "bg-indigo-500",
      lightColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      link: "/subjects",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner / Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm mb-3">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strapi v5 REST Integration Live</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            School Management System
          </h2>
          <p className="text-slate-200 text-sm mt-2 leading-relaxed">
            Welcome to the centralized portal for managing teachers, students, and course assignments.
            All CRUD mutations are automatically synchronized with TanStack React Query.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link} className="block group">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${stat.lightColor} border flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-slate-900">{stat.count}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                    {stat.title}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Detailed Previews: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Teachers */}
        <Card hover={false}>
          <Card.Header>
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-sm">Faculty Overview</h3>
            </div>
            <Link to="/teachers" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card.Header>
          <Card.Body className="p-0 divide-y divide-slate-100">
            {teachers.length === 0 ? (
              <p className="p-6 text-sm text-slate-400 text-center">No teachers registered</p>
            ) : (
              teachers.slice(0, 4).map((t) => (
                <div key={getEntityId(t)} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.email || "No email"}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                    {t.subject?.name || "No subject"}
                  </span>
                </div>
              ))
            )}
          </Card.Body>
        </Card>

        {/* Recent Students */}
        <Card hover={false}>
          <Card.Header>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-800 text-sm">Students Overview</h3>
            </div>
            <Link to="/students" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card.Header>
          <Card.Body className="p-0 divide-y divide-slate-100">
            {students.length === 0 ? (
              <p className="p-6 text-sm text-slate-400 text-center">No students registered</p>
            ) : (
              students.slice(0, 4).map((s) => (
                <div key={getEntityId(s)} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.email || "No email"}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                    {(s.subjects?.length || 0)} {(s.subjects?.length === 1 ? "course" : "courses")}
                  </span>
                </div>
              ))
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
