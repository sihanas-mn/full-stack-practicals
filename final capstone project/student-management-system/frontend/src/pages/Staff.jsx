import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  Shield,
  UserCheck,
  Plus,
  Search,
  Filter,
  Trash2,
  Mail,
  Calendar,
  AlertCircle,
  Users,
  Pencil,
  X,
  Save,
  Loader2,
  Lock,
  User,
  CheckCircle2
} from "lucide-react";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";
import { getImageUrl } from "../utils/imageUtils";

const Staff = () => {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "staff",
    password: ""
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const fetchStaff = async () => {
    setLoading(true);
    setError("");
    try {
      let query = "";
      const params = [];
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (roleFilter) params.push(`role=${roleFilter}`);
      if (params.length > 0) query = `?${params.join("&")}`;

      const res = await api.get(`/staff${query}`);
      setStaffList(res.data.staff || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load staff directory"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStaff();
    }, 300);
    return () => clearTimeout(delay);
  }, [search, roleFilter]);

  // Open Edit modal
  const handleOpenEdit = (staff) => {
    setStaffToEdit(staff);
    setEditForm({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      password: ""
    });
    setEditError("");
    setEditModalOpen(true);
  };

  // Submit Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!staffToEdit) return;
    setEditError("");

    if (!editForm.name.trim() || !editForm.email.trim()) {
      setEditError("Name and email are required.");
      return;
    }

    if (editForm.password && editForm.password.length < 6) {
      setEditError("Password must be at least 6 characters long.");
      return;
    }

    setEditLoading(true);
    try {
      const payload = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        role: editForm.role
      };

      if (editForm.password) {
        payload.password = editForm.password;
      }

      await api.put(`/staff/${staffToEdit._id}`, payload);
      setSuccess(`Staff account for ${editForm.name} updated successfully!`);
      setEditModalOpen(false);
      setStaffToEdit(null);
      fetchStaff();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setEditError(
        err.response?.data?.message || "Failed to update staff member"
      );
    } finally {
      setEditLoading(false);
    }
  };

  // Submit Delete
  const handleDelete = async () => {
    if (!staffToDelete) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/staff/${staffToDelete._id}`);
      setSuccess(`Staff member ${staffToDelete.name} was removed from the system.`);
      setDeleteModalOpen(false);
      setStaffToDelete(null);
      fetchStaff();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete staff member");
    } finally {
      setDeleteLoading(false);
    }
  };

  const adminCount = staffList.filter((s) => s.role === "admin").length;
  const standardStaffCount = staffList.filter((s) => s.role === "staff").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Staff & Faculty Directory
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {isAdmin
              ? "Manage administrative personnel, instructors, and system access accounts."
              : "Institutional faculty and staff members directory view."}
          </p>
        </div>

        {/* Add Staff is strictly available to Admins only */}
        {isAdmin && (
          <Link
            to="/staff/add"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Staff Member</span>
          </Link>
        )}
      </div>

      {/* Success banner */}
      {success && (
        <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-900/50">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Personnel
            </span>
            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
              {staffList.length}
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Administrators
            </span>
            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
              {adminCount}
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 ring-1 ring-violet-500/20">
            <Shield className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Faculty Staff
            </span>
            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
              {standardStaffCount}
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
            <UserCheck className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search staff by name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 sm:w-56">
          <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0 hidden sm:block" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 py-2.5 px-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          >
            <option value="">All Roles</option>
            <option value="admin">Administrators</option>
            <option value="staff">Staff Members</option>
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

      {/* Content Table */}
      {loading ? (
        <Loading message="Loading staff directory..." />
      ) : staffList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-4">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No staff records found
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {search || roleFilter
              ? "No staff members matched your search criteria."
              : "Register your first staff member to assign system responsibilities."}
          </p>
          {isAdmin && (
            <div className="mt-6">
              <Link
                to="/staff/add"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Staff Member</span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Staff Member
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Email Address
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    System Role
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Member Since
                  </th>
                  {/* Actions column only visible to Admin */}
                  {isAdmin && (
                    <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {staffList.map((staff) => {
                  const isCurrent = currentUser?._id === staff._id;
                  return (
                    <tr
                      key={staff._id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-xs overflow-hidden">
                            {staff.profilePicture ? (
                              <img
                                src={getImageUrl(staff.profilePicture)}
                                alt={staff.name}
                                className="h-full w-full object-cover"
                              />
                            ) : staff.name ? (
                              staff.name.charAt(0).toUpperCase()
                            ) : (
                              "S"
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{staff.name}</span>
                              {isCurrent && (
                                <span className="inline-block rounded-md bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 ring-1 ring-blue-700/20">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              ID: {staff._id.slice(-6).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                          <span>{staff.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            staff.role === "admin"
                              ? "bg-violet-50 text-violet-700 ring-1 ring-violet-600/20 dark:bg-violet-950/50 dark:text-violet-400 dark:ring-violet-800/40"
                              : "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-800/40"
                          }`}
                        >
                          {staff.role === "admin" ? (
                            <Shield className="h-3 w-3" />
                          ) : (
                            <UserCheck className="h-3 w-3" />
                          )}
                          <span className="capitalize">{staff.role}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                          <span>
                            {staff.createdAt
                              ? new Date(staff.createdAt).toLocaleDateString()
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* Actions Column (Admin Only) */}
                      {isAdmin && (
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEdit(staff)}
                              className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                              title="Edit Staff Member"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>

                            {isCurrent ? (
                              <span className="text-xs text-slate-400 dark:text-slate-500 italic pr-2">
                                Active
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  setStaffToDelete(staff);
                                  setDeleteModalOpen(true);
                                }}
                                className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                                title="Delete Staff Member"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Staff Modal (Admin Only) */}
      {isAdmin && editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800 p-6 md:p-7 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
                  <Pencil className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Edit Staff Member
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Update credentials and administrative authority.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {editError && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Role Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  System Role *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, role: "staff" })}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      editForm.role === "staff"
                        ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-500/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <UserCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 dark:text-white">
                        Staff Member
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, role: "admin" })}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      editForm.role === "admin"
                        ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-500/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <Shield className="h-4 w-4 text-violet-600 dark:text-violet-400 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 dark:text-white">
                        Administrator
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Optional Password Reset */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Reset Password (Optional)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Leave empty to keep existing password"
                    value={editForm.password}
                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    minLength={6}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 font-medium"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Only enter a new password if you want to reset this user's password.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {editLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal (Admin Only) */}
      {isAdmin && (
        <ConfirmModal
          isOpen={deleteModalOpen}
          title="Delete Staff Member"
          message={`Are you sure you want to permanently delete staff member ${staffToDelete?.name} (${staffToDelete?.email})? This user will immediately lose access to the portal.`}
          confirmText="Delete Account"
          onConfirm={handleDelete}
          onClose={() => {
            setDeleteModalOpen(false);
            setStaffToDelete(null);
          }}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Staff;
