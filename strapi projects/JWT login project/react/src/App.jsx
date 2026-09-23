import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import LoginView from './components/LoginView';
import StudentModal from './components/StudentModal';
import StudentViewModal from './components/StudentViewModal';
import DeleteModal from './components/DeleteModal';
import { studentService, authService } from './services/api';
import {
  Search,
  Plus,
  Filter,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Eye,
  Pencil,
  Trash2,
  Lock,
  LayoutGrid,
  List,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('sms_jwt') || null);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Student data state
  const [students, setStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null);
  const [isSubmittingStudent, setIsSubmittingStudent] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudentForDelete, setSelectedStudentForDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Check login on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('sms_jwt');
      if (storedToken) {
        try {
          const userProfile = await authService.getMe();
          setUser(userProfile);
          setToken(storedToken);
        } catch (err) {
          console.error('Session expired or invalid:', err);
          localStorage.removeItem('sms_jwt');
          setToken(null);
          setUser(null);
        }
      }
      setIsInitializing(false);
    };

    initAuth();
  }, []);

  // Fetch students when authenticated
  const fetchStudents = async (showLoader = true) => {
    if (!token) return;
    if (showLoader) setIsLoadingStudents(true);
    setIsRefreshing(true);
    try {
      const res = await studentService.getAll();
      setStudents(res.data || []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showToast('Failed to load students list from Strapi', 'error');
    } finally {
      setIsLoadingStudents(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStudents();
    }
  }, [token]);

  const handleLoginSuccess = (jwt, userProfile) => {
    setToken(jwt);
    setUser(userProfile);
    const roleName = userProfile?.role?.name || 'User';
    showToast(`Welcome back, ${userProfile.username}! Logged in with ${roleName} permissions.`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('sms_jwt');
    setToken(null);
    setUser(null);
    setStudents([]);
    showToast('Logged out successfully', 'info');
  };

  // Determine if current user is Admin
  const isAdmin = useMemo(() => {
    if (!user) return false;
    const roleName = user.role?.name?.toLowerCase() || '';
    const roleType = user.role?.type?.toLowerCase() || '';
    return roleName.includes('admin') || roleType === 'admin' || user.username?.includes('admin');
  }, [user]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        !searchQuery ||
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = departmentFilter === 'All' || s.department === departmentFilter;
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [students, searchQuery, departmentFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === 'Active').length;
    const gpas = students.filter((s) => s.gpa !== undefined && s.gpa !== null).map((s) => Number(s.gpa));
    const avgGpa = gpas.length > 0 ? (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2) : '0.00';
    
    // Departments count
    const depts = new Set(students.map((s) => s.department).filter(Boolean));
    return { total, active, avgGpa, deptsCount: depts.size };
  }, [students]);

  // Unique departments for filter
  const departmentsList = useMemo(() => {
    const set = new Set(students.map((s) => s.department).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [students]);

  // CRUD Handlers
  const handleOpenAddModal = () => {
    setSelectedStudentForEdit(null);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setSelectedStudentForEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleOpenViewModal = (student) => {
    setSelectedStudentForView(student);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (student) => {
    setSelectedStudentForDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleSaveStudent = async (formData) => {
    setIsSubmittingStudent(true);
    try {
      if (selectedStudentForEdit) {
        const docId = selectedStudentForEdit.documentId || selectedStudentForEdit.id;
        await studentService.update(docId, formData);
        showToast(`Updated student "${formData.name}" successfully!`, 'success');
      } else {
        await studentService.create(formData);
        showToast(`Added student "${formData.name}" successfully!`, 'success');
      }
      setIsStudentModalOpen(false);
      fetchStudents(false);
    } catch (err) {
      console.error('Error saving student:', err);
      const msg = err.response?.data?.error?.message || 'Action forbidden or server error';
      showToast(msg, 'error');
    } finally {
      setIsSubmittingStudent(false);
    }
  };

  const handleConfirmDelete = async (docId) => {
    setIsDeleting(true);
    try {
      await studentService.delete(docId);
      showToast('Student record deleted permanently', 'success');
      setIsDeleteModalOpen(false);
      fetchStudents(false);
    } catch (err) {
      console.error('Error deleting student:', err);
      const msg = err.response?.data?.error?.message || 'Action forbidden or server error';
      showToast(msg, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Graduated':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Inactive':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      case 'Suspended':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 animate-pulse flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <p className="text-xs text-slate-400 font-medium">Connecting to Student Management System...</p>
      </div>
    );
  }

  // Not logged in
  if (!token) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div
            className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold backdrop-blur-xl border ${
              toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/30 text-rose-200'
                : toast.type === 'info'
                ? 'bg-slate-900/90 border-slate-700/50 text-slate-200'
                : 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onRefresh={() => fetchStudents(true)}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Role Banner / Access Status */}
        {isAdmin ? (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-indigo-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>Administrator Control Panel</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                    Full CRUD
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  You have full authorization to Create, Read, Update, and Delete student records.
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/20 transition-all shrink-0 hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Student</span>
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/20 flex items-center space-x-3 shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <span>Student Read-Only Portal</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                  View-Only Mode
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                You are logged in with student permissions. You can view all academic records and profiles, but editing or deleting is restricted to administrators.
              </p>
            </div>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Total Enrolled</span>
              <Users className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{stats.total}</div>
            <p className="text-[11px] text-slate-500 mt-1">Across all departments</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Active Students</span>
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{stats.active}</div>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}% active status` : '0%'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Average GPA</span>
              <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300">
              {stats.avgGpa}
              <span className="text-xs font-normal text-slate-500"> / 4.0</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Academic grade average</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span>Departments</span>
              <BookOpen className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-300">{stats.deptsCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">Active faculty programs</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Filters & View Switcher */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-end overflow-x-auto">
            {/* Department Dropdown */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              {departmentsList.map((dept) => (
                <option key={dept} value={dept} className="bg-slate-900 text-white">
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>

            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All" className="bg-slate-900 text-white">All Statuses</option>
              <option value="Active" className="bg-slate-900 text-white">Active</option>
              <option value="Inactive" className="bg-slate-900 text-white">Inactive</option>
              <option value="Graduated" className="bg-slate-900 text-white">Graduated</option>
              <option value="Suspended" className="bg-slate-900 text-white">Suspended</option>
            </select>

            {/* View switcher buttons */}
            <div className="flex items-center bg-slate-950/60 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Student Records Content */}
        {isLoadingStudents ? (
          <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400">Loading student directory...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-500">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No students found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || departmentFilter !== 'All' || statusFilter !== 'All'
                ? 'Try adjusting your search queries or department filters.'
                : 'No student records have been created yet.'}
            </p>
            {isAdmin && (
              <button
                onClick={handleOpenAddModal}
                className="mt-2 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Student</span>
              </button>
            )}
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Student</th>
                    <th className="px-5 py-3.5">Student ID</th>
                    <th className="px-5 py-3.5">Department</th>
                    <th className="px-5 py-3.5">GPA</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredStudents.map((st) => (
                    <tr
                      key={st.documentId || st.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Name + Avatar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-indigo-950/40 shrink-0">
                            {st.name ? st.name.charAt(0) : 'S'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                              {st.name}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">{st.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="px-5 py-4 font-mono text-slate-300 font-medium">
                        {st.studentId}
                      </td>

                      {/* Department */}
                      <td className="px-5 py-4">
                        <p className="text-slate-200 font-medium">{st.department}</p>
                        <p className="text-[11px] text-slate-500">{st.semester || 'N/A'}</p>
                      </td>

                      {/* GPA */}
                      <td className="px-5 py-4">
                        <span className="font-bold text-amber-300">
                          {st.gpa !== undefined && st.gpa !== null ? Number(st.gpa).toFixed(2) : '3.50'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(st.status)}`}>
                          {st.status || 'Active'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenViewModal(st)}
                            title="View Profile"
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {isAdmin ? (
                            <>
                              <button
                                onClick={() => handleOpenEditModal(st)}
                                title="Edit Student"
                                className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenDeleteModal(st)}
                                title="Delete Student"
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span
                              title="Read-only: Students cannot edit"
                              className="p-1.5 rounded-lg bg-slate-800/40 text-slate-600 cursor-not-allowed"
                            >
                              <Lock className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((st) => (
              <div
                key={st.documentId || st.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl flex flex-col justify-between transition-all group shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-indigo-950/40">
                      {st.name ? st.name.charAt(0) : 'S'}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(st.status)}`}>
                      {st.status || 'Active'}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                    {st.name}
                  </h4>
                  <p className="text-xs font-mono text-indigo-400 mt-0.5">{st.studentId}</p>
                  <p className="text-xs text-slate-400 mt-1 truncate">{st.email}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-slate-500 text-[10px]">Department</p>
                      <p className="font-semibold text-slate-300">{st.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px]">GPA</p>
                      <p className="font-bold text-amber-300">
                        {st.gpa !== undefined && st.gpa !== null ? Number(st.gpa).toFixed(2) : '3.50'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleOpenViewModal(st)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  {isAdmin ? (
                    <>
                      <button
                        onClick={() => handleOpenEditModal(st)}
                        className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(st)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <span
                      title="Read-only"
                      className="p-2 rounded-xl bg-slate-800/40 text-slate-600 flex items-center space-x-1 cursor-not-allowed text-xs"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSubmit={handleSaveStudent}
        student={selectedStudentForEdit}
        isLoading={isSubmittingStudent}
      />

      <StudentViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        student={selectedStudentForView}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        student={selectedStudentForDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
