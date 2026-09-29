import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  CalendarCheck,
  Trash2,
  AlertCircle
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
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Attendance Log
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2 px-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2 px-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
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
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2 px-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
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
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <Loading message="Fetching attendance history..." />
      ) : attendance.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mb-4">
            <CalendarCheck className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No attendance records found
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
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
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attendance.map((record) => (
                  <tr
                    key={record._id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-800 dark:text-slate-300 whitespace-nowrap">
                      {record.date
                        ? new Date(record.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      {record.student ? (
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            {record.student.firstName} {record.student.lastName}
                          </span>
                          <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                            {record.student.studentId}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                          Unknown Student
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {record.course ? (
                        <div>
                          <span className="font-medium text-slate-800 dark:text-slate-200 block">
                            {record.course.courseName}
                          </span>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                            {record.course.courseCode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                          Unknown Course
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          record.status === "Present"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-800/40"
                            : record.status === "Absent"
                            ? "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-800/40"
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950/50 dark:text-amber-400 dark:ring-amber-800/40"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            record.status === "Present"
                              ? "bg-emerald-500"
                              : record.status === "Absent"
                              ? "bg-rose-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400">
                      {record.remarks || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setRecordToDelete(record);
                          setDeleteModalOpen(true);
                        }}
                        className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove Record"
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

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Remove Attendance Record"
        message="Are you sure you want to remove this student attendance record?"
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
