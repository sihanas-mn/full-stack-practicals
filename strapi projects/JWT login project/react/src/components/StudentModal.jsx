import React, { useState, useEffect } from 'react';
import { X, Loader2, Save, User, Hash, Mail, Phone, BookOpen, Calendar, Award, MapPin } from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Data Science & AI',
  'Information Systems',
  'Civil Engineering',
  'Business Analytics',
];

const STATUS_OPTIONS = ['Active', 'Inactive', 'Graduated', 'Suspended'];

export default function StudentModal({ isOpen, onClose, onSubmit, student, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    semester: '1st Semester',
    gpa: '3.50',
    status: 'Active',
    enrollmentDate: new Date().toISOString().split('T')[0],
    address: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        studentId: student.studentId || '',
        email: student.email || '',
        phone: student.phone || '',
        department: student.department || 'Computer Science',
        semester: student.semester || '1st Semester',
        gpa: student.gpa !== undefined && student.gpa !== null ? String(student.gpa) : '3.50',
        status: student.status || 'Active',
        enrollmentDate: student.enrollmentDate ? student.enrollmentDate.split('T')[0] : new Date().toISOString().split('T')[0],
        address: student.address || '',
      });
    } else {
      setFormData({
        name: '',
        studentId: `STU-2024-${Math.floor(100 + Math.random() * 900)}`,
        email: '',
        phone: '',
        department: 'Computer Science',
        semester: '1st Semester',
        gpa: '3.50',
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0],
        address: '',
      });
    }
    setError('');
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.studentId.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields (Name, Student ID, Email).');
      return;
    }
    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError('GPA must be a number between 0.00 and 4.00');
      return;
    }

    onSubmit({
      ...formData,
      gpa: gpaNum,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div>
            <h2 className="text-lg font-bold text-white">
              {student ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {student ? `Update profile for ${student.name}` : 'Register a new student in the system'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Student ID <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="STU-2024-001"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="eleanor@university.edu"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Department <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept} className="bg-slate-900 text-white">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Current Semester
              </label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="4th Semester"
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* GPA */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                GPA (0.00 - 4.00)
              </label>
              <div className="relative">
                <Award className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  placeholder="3.75"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Academic Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st} className="bg-slate-900 text-white">
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Enrollment Date */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Enrollment Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="date"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Address / Residence
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <textarea
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 123 Campus Dr, Tech City"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-800 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{student ? 'Update Student' : 'Create Student'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
