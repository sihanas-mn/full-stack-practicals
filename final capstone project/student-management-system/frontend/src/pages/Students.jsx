import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Phone,
  Mail,
  CreditCard,
  Download
} from "lucide-react";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";
import StudentIDCardModal from "../components/StudentIDCardModal";
import { exportToCSV } from "../utils/exportUtils";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1
  });

  // Student ID Card modal state
  const [idCardModalOpen, setIdCardModalOpen] = useState(false);
  const [selectedStudentForIDCard, setSelectedStudentForIDCard] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      let query = `?page=${page}&limit=${pagination.limit}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      if (statusFilter) query += `&status=${statusFilter}`;

      const res = await api.get(`/students${query}`);
      setStudents(res.data.students || []);
      setPagination(
        res.data.pagination || { page: 1, limit: 8, total: 0, totalPages: 1 }
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to retrieve student records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchStudents(1);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, statusFilter]);

  const handleDelete = async () => {
    if (!studentToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/students/${studentToDelete._id}`);
      setDeleteModalOpen(false);
      setStudentToDelete(null);
      fetchStudents(pagination.page);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete student");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleExportCSV = () => {
    const columns = [
      { label: "Student ID", key: "studentId" },
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "Gender", key: "gender" },
      {
        label: "Date of Birth",
        key: (s) => (s.dateOfBirth ? new Date(s.dateOfBirth).toISOString().split("T")[0] : "")
      },
      { label: "Guardian Name", key: (s) => s.guardianName || "" },
      { label: "Guardian Phone", key: (s) => s.guardianPhone || "" },
      { label: "Address", key: (s) => s.address || "" },
      { label: "Status", key: "status" }
    ];

    exportToCSV(
      students,
      `students_roster_${new Date().toISOString().split("T")[0]}`,
      columns
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            Students Directory
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage student registrations, academic statuses, and profiles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={students.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 disabled:opacity-50 transition-colors cursor-pointer"
            title="Export filtered student roster to CSV spreadsheet"
          >
            <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/students/add"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by ID, name or email..."
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

      {/* Content state */}
      {loading ? (
        <Loading message="Fetching student records..." />
      ) : students.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-4">
            <Users className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No students found
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {search || statusFilter
              ? "No records matched your search filters. Try clearing your filters."
              : "Get started by adding your first student to the system."}
          </p>
          <div className="mt-6">
            <Link
              to="/students/add"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Register Student</span>
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
                    Student ID
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Name
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Contact Info
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Gender & DOB
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Guardian
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-blue-600 dark:text-blue-400">
                      {student.studentId}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="py-3.5 px-4 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{student.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs whitespace-nowrap">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {student.gender}
                      </span>
                      <div className="text-slate-400 dark:text-slate-500 text-[11px] mt-0.5">
                        {student.dateOfBirth
                          ? new Date(student.dateOfBirth).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {student.guardianName || "-"}
                      </div>
                      <div className="text-slate-400 dark:text-slate-500 text-[11px]">
                        {student.guardianPhone || ""}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-800/40"
                            : "bg-slate-100 text-slate-600 ring-1 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            student.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStudentForIDCard(student);
                            setIdCardModalOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                          title="Generate Student ID Pass"
                        >
                          <CreditCard className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/students/${student._id}/edit`}
                          className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Edit Student"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setStudentToDelete(student);
                            setDeleteModalOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete Student"
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

          {/* Pagination controls */}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 px-4 py-3 text-xs text-slate-500 dark:text-slate-400 sm:px-6">
            <div>
              Showing{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {(pagination.page - 1) * pagination.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {pagination.total}
              </span>{" "}
              students
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={pagination.page <= 1}
                onClick={() => fetchStudents(pagination.page - 1)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <span className="px-2 font-medium text-slate-600 dark:text-slate-400">
                Page {pagination.page} of {pagination.totalPages || 1}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchStudents(pagination.page + 1)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Student"
        message={`Are you sure you want to permanently delete student ${studentToDelete?.firstName} ${studentToDelete?.lastName} (${studentToDelete?.studentId})? This action cannot be undone.`}
        confirmText="Delete Student"
        onConfirm={handleDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
        loading={deleteLoading}
      />

      {/* Digital Student ID Card Modal */}
      <StudentIDCardModal
        student={selectedStudentForIDCard}
        isOpen={idCardModalOpen}
        onClose={() => {
          setIdCardModalOpen(false);
          setSelectedStudentForIDCard(null);
        }}
      />
    </div>
  );
};

export default Students;
