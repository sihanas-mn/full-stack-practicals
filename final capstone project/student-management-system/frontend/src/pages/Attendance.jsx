import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  CalendarCheck,
  Plus,
  Filter,
  Trash2,
  AlertCircle,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    setError("");
    try {
      let query = "";
      const params = [];
      if (selectedDate) params.push(`date=${selectedDate}`);
      if (selectedCourse) params.push(`course=${selectedCourse}`);
      if (selectedStatus) params.push(`status=${selectedStatus}`);
      if (params.length > 0) query = `?${params.join("&")}`;

      const [attRes, coursesRes] = await Promise.all([
        api.get(`/attendance${query}`),
        api.get("/courses")
      ]);

      setAttendance(attRes.data.attendance || []);
      setCourses(coursesRes.data.courses || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to retrieve attendance logs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate, selectedCourse, selectedStatus]);

  const handleDelete = async () => {
    if (!recordToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/attendance/${recordToDelete._id}`);
      setDeleteModalOpen(false);
      setRecordToDelete(null);
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove attendance record");
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
            Attendance Log
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View daily student check-ins, presence statuses, and attendance records.
          </p>
        </div>

        <Link
          to="/attendance/mark"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
        >
          <CalendarCheck className="h-4 w-4" />
          <span>Mark Class Attendance</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl shadow-xs ring-1 ring-slate-200/70">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 px-3 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 px-3 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.courseCode} - {c.courseName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 px-3 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          >
            <option value="">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
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

      {/* Content */}
      {loading ? (
        <Loading message="Fetching attendance history..." />
      ) : attendance.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
            <CalendarCheck className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No attendance records found
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
            {selectedDate || selectedCourse || selectedStatus
              ? "No records matched your selected criteria."
              : "No attendance has been taken yet. Start by taking class attendance today."}
          </p>
          <div className="mt-6">
            <Link
              to="/attendance/mark"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Mark Attendance</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-slate-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Date
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Student
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Course
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Remarks
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendance.map((record) => (
                  <tr
                    key={record._id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-800 whitespace-nowrap">
                      {record.date
                        ? new Date(record.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      {record.student ? (
                        <div>
                          <span className="font-semibold text-slate-900 block">
                            {record.student.firstName} {record.student.lastName}
                          </span>
                          <span className="text-xs font-mono font-medium text-blue-600">
                            {record.student.studentId}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Unknown Student
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {record.course ? (
                        <div>
                          <span className="font-medium text-slate-800 block">
                            {record.course.courseName}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {record.course.courseCode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Unknown Course
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          record.status === "Present"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                            : record.status === "Absent"
                            ? "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20"
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                        }`}
                      >
                        {record.status === "Present" ? (
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        ) : record.status === "Absent" ? (
                          <XCircle className="h-3 w-3 text-rose-600" />
                        ) : (
                          <Clock className="h-3 w-3 text-amber-600" />
                        )}
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {record.remarks || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setRecordToDelete(record);
                          setDeleteModalOpen(true);
                        }}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        title="Delete Attendance Record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Remove Attendance Record"
        message="Are you sure you want to remove this attendance record?"
        confirmText="Remove Record"
        onConfirm={handleDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setRecordToDelete(null);
        }}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Attendance;
