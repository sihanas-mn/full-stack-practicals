import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import Loading from "../components/Loading";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    status: "Active"
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        const s = res.data.student;
        setForm({
          studentId: s.studentId || "",
          firstName: s.firstName || "",
          lastName: s.lastName || "",
          email: s.email || "",
          phone: s.phone || "",
          gender: s.gender || "Male",
          dateOfBirth: s.dateOfBirth
            ? new Date(s.dateOfBirth).toISOString().split("T")[0]
            : "",
          address: s.address || "",
          guardianName: s.guardianName || "",
          guardianPhone: s.guardianPhone || "",
          status: s.status || "Active"
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load student details"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

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
      await api.put(`/students/${id}`, form);
      navigate("/students");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update student record"
      );
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loading message="Loading student profile..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-4">
        <Link
          to="/students"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Edit Student: {form.firstName} {form.lastName}
          </h1>
          <p className="text-sm text-slate-500">
            Modify profile parameters and update active record.
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
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">
            Academic & Personal Identity
          </h2>
          <p className="text-xs text-slate-500">
            Key identifiers used across the institution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Student ID *
            </label>
            <input
              type="text"
              name="studentId"
              placeholder="e.g. STU001"
              value={form.studentId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all font-mono font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g. John"
              value={form.firstName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="e.g. Perera"
              value={form.lastName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="student@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              placeholder="0771234567"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Gender *
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Student Status *
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

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Residential Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Street address, City, District"
            value={form.address}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div className="border-t border-slate-100 pt-5">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Guardian Information
            </h2>
            <p className="text-xs text-slate-500">
              Contact point for emergency notifications and administrative letters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Guardian Full Name
              </label>
              <input
                type="text"
                name="guardianName"
                placeholder="e.g. Mr. S. Perera"
                value={form.guardianName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Guardian Phone Number
              </label>
              <input
                type="text"
                name="guardianPhone"
                placeholder="0777654321"
                value={form.guardianPhone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            to="/students"
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
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Update Student</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
