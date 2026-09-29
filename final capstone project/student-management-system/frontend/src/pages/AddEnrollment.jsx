import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import Loading from "../components/Loading";

const AddEnrollment = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const [form, setForm] = useState({
    student: "",
    course: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    batch: "B001",
    status: "Active"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          api.get("/students?limit=100"),
          api.get("/courses?status=Active")
        ]);

        setStudents(studentsRes.data.students || []);
        setCourses(coursesRes.data.courses || []);

        if (studentsRes.data.students?.length > 0) {
          setForm((prev) => ({
            ...prev,
            student: studentsRes.data.students[0]._id
          }));
        }

        if (coursesRes.data.courses?.length > 0) {
          setForm((prev) => ({
            ...prev,
            course: coursesRes.data.courses[0]._id
          }));
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load students and courses"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.student || !form.course) {
      setError("Please select both a student and a course.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/enrollments", form);
      navigate("/enrollments");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create enrollment record"
      );
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loading message="Loading enrollment form resources..." />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-4">
        <Link
          to="/enrollments"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Course Enrollment
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Assign a student to an active course program and designated batch.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {students.length === 0 || courses.length === 0 ? (
        <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-6 text-amber-800 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-900/50">
          <h3 className="font-bold text-base">Prerequisites Missing</h3>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300/90">
            {students.length === 0 && courses.length === 0
              ? "You must add at least one student and one active course before creating an enrollment."
              : students.length === 0
              ? "Please register at least one student first."
              : "Please create at least one active course first."}
          </p>
          <div className="mt-4 flex gap-3">
            {students.length === 0 && (
              <Link
                to="/students/add"
                className="rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
              >
                Add Student
              </Link>
            )}
            {courses.length === 0 && (
              <Link
                to="/courses/add"
                className="rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
              >
                Add Course
              </Link>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 space-y-6"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Select Student *
            </label>
            <select
              name="student"
              value={form.student}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
              required
            >
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.studentId} - {s.firstName} {s.lastName} ({s.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Select Course *
            </label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
              required
            >
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseCode} - {c.courseName} (Rs. {Number(c.fee).toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Batch Identifier *
              </label>
              <input
                type="text"
                name="batch"
                placeholder="e.g. B001"
                value={form.batch}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all uppercase font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Enrollment Date *
              </label>
              <input
                type="date"
                name="enrollmentDate"
                value={form.enrollmentDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Enrollment Status *
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
              required
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/enrollments"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Enrolling...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm Enrollment</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEnrollment;
