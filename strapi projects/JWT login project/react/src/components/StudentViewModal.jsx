import React from 'react';
import { X, GraduationCap, Mail, Phone, Calendar, MapPin, Award, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StudentViewModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header Cover */}
        <div className="h-28 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-700 relative p-4 flex items-start justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10">
            Student Profile Details
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Details Content */}
        <div className="px-6 pb-6 relative -mt-10">
          <div className="flex items-end justify-between mb-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border-4 border-slate-900 shadow-xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-tr from-indigo-500 to-purple-600">
              {student.name ? student.name.charAt(0) : 'S'}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(student.status)}`}>
              {student.status || 'Active'}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{student.name}</h2>
            <p className="text-xs font-mono text-indigo-400 font-medium mt-0.5">{student.studentId}</p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 my-5">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Department</span>
              </div>
              <p className="text-xs font-semibold text-white truncate">{student.department}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{student.semester || 'N/A'}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Academic GPA</span>
              </div>
              <p className="text-base font-bold text-amber-300">
                {student.gpa !== undefined && student.gpa !== null ? Number(student.gpa).toFixed(2) : '3.50'}
                <span className="text-[11px] text-slate-500 font-normal"> / 4.00</span>
              </p>
            </div>
          </div>

          {/* Detailed Info List */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-300">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{student.email}</span>
            </div>

            {student.phone && (
              <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-300">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{student.phone}</span>
              </div>
            )}

            {student.enrollmentDate && (
              <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-300">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Enrolled on {student.enrollmentDate.split('T')[0]}</span>
              </div>
            )}

            {student.address && (
              <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{student.address}</span>
              </div>
            )}
          </div>

          {/* Close button */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
