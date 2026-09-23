import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, UserCheck, KeyRound, Mail, ArrowRight, Loader2, AlertCircle, Database, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/api';

export default function LoginView({ onLoginSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!identifier || !password) {
      setError('Please enter both email/username and password');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(identifier, password);
      // Fetch me with role
      localStorage.setItem('sms_jwt', data.jwt);
      const userProfile = await authService.getMe();
      onLoginSuccess(data.jwt, userProfile);
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.error?.message || 'Failed to login. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email, pass) => {
    setIdentifier(email);
    setPassword(pass);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 p-8 shadow-2xl shadow-indigo-950/40">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 items-center justify-center shadow-xl shadow-indigo-500/25 ring-1 ring-white/20 mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Student Management</h1>
            <p className="text-sm text-slate-400 mt-1">Sign in with your JWT credentials</p>
          </div>

          {/* Quick Demo Login Switchers */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
              <span>Quick Demo Accounts</span>
              <span className="text-[10px] lowercase text-indigo-400 font-mono">click to autofill</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@sms.com', 'AdminPassword123!')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  identifier === 'admin@sms.com'
                    ? 'bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500/30'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60'
                }`}
              >
                <div className="flex items-center space-x-1 text-emerald-400 font-semibold text-xs mb-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono truncate">admin@sms.com</div>
                <div className="text-[9px] text-slate-500 font-medium">All 8 Students</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('student@sms.com', 'StudentPassword123!')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  identifier === 'student@sms.com'
                    ? 'bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500/30'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60'
                }`}
              >
                <div className="flex items-center space-x-1 text-amber-400 font-semibold text-xs mb-0.5">
                  <UserCheck className="w-3 h-3" />
                  <span>Alex (Student)</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono truncate">student@sms.com</div>
                <div className="text-[9px] text-slate-500 font-medium">Own Record Only</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('sophia.student@sms.com', 'StudentPassword123!')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  identifier === 'sophia.student@sms.com'
                    ? 'bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500/30'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60'
                }`}
              >
                <div className="flex items-center space-x-1 text-cyan-400 font-semibold text-xs mb-0.5">
                  <UserCheck className="w-3 h-3" />
                  <span>Sophia (Student)</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono truncate">sophia.student...</div>
                <div className="text-[9px] text-slate-500 font-medium">Own Record Only</div>
              </button>
            </div>

          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start space-x-2.5 text-red-400 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@sms.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* System info footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>MongoDB Atlas Cloud</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Express + JWT Active</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
