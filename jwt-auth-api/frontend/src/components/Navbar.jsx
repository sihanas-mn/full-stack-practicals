import React from 'react';
import { Shield, Key, Database, User, LogOut, LogIn, Sliders, Layers, BookOpen, Terminal } from 'lucide-react';

export default function Navbar({
  user,
  token,
  transportMode,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onLogout,
  onToggleFacility,
  showFacility
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  JWT Auth Hub
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Local Mongo
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Secure JWT with Header & Cookie Facility
              </p>
            </div>
          </div>

          {/* Nav Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'courses'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Courses
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'playground'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              API Playground
            </button>
            {user && (
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'profile'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Token Facility Toggle Button */}
            <button
              onClick={onToggleFacility}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                showFacility
                  ? 'bg-purple-600/20 border-purple-500/50 text-purple-300 shadow-sm shadow-purple-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
              title="Configure Header vs Cookie JWT Transport"
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Auth Facility:</span>
              <span className="uppercase text-[11px] font-bold text-purple-400">
                {transportMode}
              </span>
            </button>

            {/* Auth status */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">{user.name}</span>
                  <span
                    className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                      user.role === 'admin'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium transition-all"
                  title="Logout and clear token & cookies"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Tab navigation */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-900">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`text-xs font-medium ${
              activeTab === 'dashboard' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`text-xs font-medium ${
              activeTab === 'courses' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`text-xs font-medium ${
              activeTab === 'playground' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            Playground
          </button>
          {user && (
            <button
              onClick={() => setActiveTab('profile')}
              className={`text-xs font-medium ${
                activeTab === 'profile' ? 'text-indigo-400' : 'text-slate-400'
              }`}
            >
              Profile
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
