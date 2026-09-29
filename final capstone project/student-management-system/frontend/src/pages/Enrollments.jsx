import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  GraduationCap,
  Plus,
  Trash2,
  AlertCircle,
  Filter,
  ReceiptText,
  Download
} from "lucide-react";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";
import FeeReceiptModal from "../components/FeeReceiptModal";
import { exportToCSV } from "../utils/exportUtils";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fee receipt modal state
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedEnrollmentForReceipt, setSelectedEnrollmentForReceipt] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchEnrollments = async () => {
    setLoading(true);
    setError("");
    try {
      let query = "";
      const params = [];
      if (selectedCourse) params.push(`course=${selectedCourse}`);
      if (statusFilter) params.push(`status=${statusFilter}`);
      if (params.length > 0) query = `?${params.join("&")}`;

      const [enrollRes, coursesRes] = await Promise.all([
        api.get(`/enrollments${query}`),
        api.get("/courses")
      ]);

      setEnrollments(enrollRes.data.enrollments || []);
      setCourses(coursesRes.data.courses || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load enrollment records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [selectedCourse, statusFilter]);

  const handleDelete = async () => {
    if (!enrollmentToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/enrollments/${enrollmentToDelete._id}`);
      setDeleteModalOpen(false);
      setEnrollmentToDelete(null);
      fetchEnrollments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove enrollment");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleExportCSV = () => {
    const columns = [
      {
        label: "Student ID",
        key: (e) => e.student?.studentId || ""
      },
      {
        label: "Student Name",
        key: (e) =>
          e.student ? `${e.student.firstName} ${e.student.lastName}` : ""
      },
      {
        label: "Student Email",
        key: (e) => e.student?.email || ""
      },
      {
        label: "Course Code",
        key: (e) => e.course?.courseCode || ""
      },
      {
        label: "Course Name",
        key: (e) => e.course?.courseName || ""
      },
      {
        label: "Course Fee (LKR)",
        key: (e) => (e.course?.fee !== undefined ? e.course.fee : "")
      },
      { label: "Batch", key: "batch" },
      {
        label: "Enrollment Date",
        key: (e) =>
          e.enrollmentDate
            ? new Date(e.enrollmentDate).toISOString().split("T")[0]
            : ""
      },
      { label: "Status", key: "status" }
    ];

    exportToCSV(
      enrollments,
      `enrollments_export_${new Date().toISOString().split("T")[0]}`,
      columns
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Student Enrollments
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track student admissions into academic courses and batch allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={enrollments.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 disabled:opacity-50 transition-colors cursor-pointer"
            title="Export enrollment roster to CSV"
          >
            <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/enrollments/add"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Enrollment</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div className="flex items-center gap-2 flex-1">
          <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2.5 px-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.courseCode} - {c.courseName}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2.5 px-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
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
        <Loading message="Fetching student enrollment list..." />
      ) : enrollments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 mb-4">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No enrollments found
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {selectedCourse || statusFilter
              ? "No enrollments matched the chosen filters."
              : "No students have been enrolled in courses yet. Create an enrollment to get started."}
          </p>
          <div className="mt-6">
            <Link
              to="/enrollments/add"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Enroll Student</span>
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
                    Student
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Enrolled Course
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Batch
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Enrollment Date
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {enrollments.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      {item.student ? (
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            {item.student.firstName} {item.student.lastName}
                          </span>
                          <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                            {item.student.studentId}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                          Unknown Student
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.course ? (
                        <div>
                          <span className="font-medium text-slate-800 dark:text-slate-200 block">
                            {item.course.courseName}
                          </span>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                            {item.course.courseCode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                          Unknown Course
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {item.batch}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-300">
                      {item.enrollmentDate
                        ? new Date(item.enrollmentDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-800/40"
                            : item.status === "Completed"
                            ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-800/40"
                            : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-800/40"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "Active"
                              ? "bg-emerald-500"
                              : item.status === "Completed"
                              ? "bg-blue-500"
                              : "bg-rose-500"
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEnrollmentForReceipt(item);
                            setReceiptModalOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                          title="Generate Official Tuition Receipt"
                        >
                          <ReceiptText className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEnrollmentToDelete(item);
                            setDeleteModalOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                          title="Remove Enrollment"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
        title="Remove Enrollment"
        message="Are you sure you want to remove this student from the course? All attendance logs related to this enrollment may be affected."
        confirmText="Remove Record"
        onConfirm={handleDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setEnrollmentToDelete(null);
        }}
        loading={deleteLoading}
      />

      {/* Fee Receipt & Payment Statement Modal */}
      <FeeReceiptModal
        enrollment={selectedEnrollmentForReceipt}
        isOpen={receiptModalOpen}
        onClose={() => {
          setReceiptModalOpen(false);
          setSelectedEnrollmentForReceipt(null);
        }}
      />
    </div>
  );
};

export default Enrollments;
