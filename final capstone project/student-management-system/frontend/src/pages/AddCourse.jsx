import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

const AddCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    description: "",
    duration: "",
    fee: "",
    status: "Active"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/courses", {
        ...form,
        fee: Number(form.fee)
      });
      navigate("/courses");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create course"
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-4">
        <Link
          to="/courses"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Create Course
          </h1>
          <p className="text-sm text-slate-500">
            Define a new academic curriculum program or course module.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-6 md:p-8 shadow-xs ring-1 ring-slate-200/80 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Course Code *
            </label>
            <input
              type="text"
              name="courseCode"
              placeholder="e.g. MERN001"
              value={form.courseCode}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 uppercase focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all font-mono font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Course Name *
            </label>
            <input
              type="text"
              name="courseName"
              placeholder="e.g. MERN Stack Development"
              value={form.courseName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Course Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Outline course learning objectives, syllabus, and prerequisites..."
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 6 Months"
              value={form.duration}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Course Fee (LKR) *
            </label>
            <input
              type="number"
              name="fee"
              min="0"
              placeholder="75000"
              value={form.fee}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Status *
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            to="/courses"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
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
                <span>Creating Course...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Save Course</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
