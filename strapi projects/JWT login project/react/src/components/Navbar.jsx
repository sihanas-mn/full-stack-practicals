import React from 'react';
import { GraduationCap, ShieldCheck, UserCheck, LogOut, Database, RefreshCw } from 'lucide-react';

export default function Navbar({ user, onLogout, onRefresh, isRefreshing }) {
  const isAdmin = user?.role?.name?.toLowerCase().includes('admin') || user?.role?.type === 'admin' || user?.username?.includes('admin');

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">EduManage</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400">Student Management System</p>
          </div>
        </div>

        {/* Status indicator & User Info */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Node.js + Express + MongoDB Atlas</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>


          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh students list"
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
          </button>

          {/* User badge */}
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-white">{user?.username || user?.email}</p>
              <div className="flex items-center justify-end space-x-1 mt-0.5">
                {isAdmin ? (
                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Admin (Full CRUD)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    <UserCheck className="w-3 h-3" />
                    <span>Student (Read-Only)</span>
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign out"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-xs font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
