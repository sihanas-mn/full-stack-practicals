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
  Clock,
  DollarSign
} from "lucide-react";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";

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
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Course Catalogue
          </h1>
          <p className="mt-1 text-sm text-slate-500">
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl shadow-xs ring-1 ring-slate-200/70">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by code or course name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 sm:w-56">
          <Filter className="h-4 w-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 px-3 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading & Content */}
      {loading ? (
        <Loading message="Fetching course catalogue..." />
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No courses found</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
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
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-xs ring-1 ring-slate-200/80 hover:shadow-md hover:ring-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold font-mono text-blue-700 ring-1 ring-blue-700/10">
                    {course.courseCode}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      course.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                        : "bg-slate-100 text-slate-600 ring-1 ring-slate-500/20"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        course.status === "Active"
                          ? "bg-emerald-500"
                          : "bg-slate-400"
                      }`}
                    />
                    {course.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                  {course.courseName}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.description || "No course description provided."}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <span className="text-slate-400">Fee:</span>
                    <span>Rs. {Number(course.fee).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <Link
                  to={`/courses/${course._id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => {
                    setCourseToDelete(course);
                    setDeleteModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
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
