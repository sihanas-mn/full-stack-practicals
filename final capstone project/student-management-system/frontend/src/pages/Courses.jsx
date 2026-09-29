import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  AlertCircle,
  Clock
} from "lucide-react";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";
import { getImageUrl } from "../utils/imageUtils";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      let query = "";
      const params = [];
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (statusFilter) params.push(`status=${statusFilter}`);
      if (params.length > 0) query = `?${params.join("&")}`;

      const res = await api.get(`/courses${query}`);
      setCourses(res.data.courses || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load course catalogue"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCourses();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, statusFilter]);

  const handleDelete = async () => {
    if (!courseToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/courses/${courseToDelete._id}`);
      setDeleteModalOpen(false);
      setCourseToDelete(null);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete course");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Course Catalogue
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create, manage and publish courses offered by the institute.
          </p>
        </div>

        <Link
          to="/courses/add"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by code or course name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 sm:w-56">
          <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2.5 px-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading & Content */}
      {loading ? (
        <Loading message="Fetching course catalogue..." />
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses found</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {search || statusFilter
              ? "No course records matched your search filters."
              : "No courses have been configured yet. Add your first course."}
          </p>
          <div className="mt-6">
            <Link
              to="/courses/add"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Course</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 hover:shadow-md dark:hover:shadow-slate-950/50 hover:ring-slate-300 dark:hover:ring-slate-700 transition-all"
            >
              {/* Course Banner or Decorative Header */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {course.bannerImage ? (
                  <img
                    src={getImageUrl(course.bannerImage)}
                    alt={course.courseName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-600/10 via-indigo-500/10 to-purple-600/10 dark:from-blue-500/20 dark:via-indigo-500/20 dark:to-purple-500/20 flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="inline-block rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 text-xs font-bold font-mono text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-black/5 dark:ring-white/10">
                    {course.courseCode}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-xs shadow-xs ${
                      course.status === "Active"
                        ? "bg-emerald-500/90 text-white"
                        : "bg-slate-800/80 text-slate-200"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        course.status === "Active"
                          ? "bg-white"
                          : "bg-slate-400"
                      }`}
                    />
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                    {course.courseName}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description || "No course description provided."}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                      <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-100">
                      <span className="text-slate-400 dark:text-slate-500">Fee:</span>
                      <span>Rs. {Number(course.fee).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <Link
                    to={`/courses/${course._id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => {
                      setCourseToDelete(course);
                      setDeleteModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Course"
        message={`Are you sure you want to delete course ${courseToDelete?.courseCode} - ${courseToDelete?.courseName}? This may affect enrolled students.`}
        confirmText="Delete Course"
        onConfirm={handleDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setCourseToDelete(null);
        }}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Courses;
