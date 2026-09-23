import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { setCookie } from '../api/authApi';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, onNotify }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  if (!isOpen) return null;

  // Quick fill helper for testing
  const handleQuickFill = (type) => {
    setError('');
    if (type === 'user') {
      setIsLoginTab(true);
      setEmail('john@example.com');
      setPassword('password123');
    } else if (type === 'admin') {
      setIsLoginTab(false);
      setName('System Admin');
      setEmail(`admin_${Math.floor(Math.random() * 1000)}@example.com`);
      setPassword('AdminPass123!');
      setRole('admin');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginTab) {
        // Login call
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Set token cookie directly as backup
        if (data.token) {
          setCookie('token', data.token, 1);
        }

        onAuthSuccess(data.user, data.token);
        onNotify('Logged in successfully!', 'success');
        onClose();
      } else {
        // Register call
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name, email, password, role })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        onNotify('Registration successful! Logging you in...', 'success');

        // Automatically log in after registration
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.token) {
          setCookie('token', loginData.token, 1);
          onAuthSuccess(loginData.user, loginData.token);
          onClose();
        } else {
          setIsLoginTab(true);
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
      onNotify(err.message || 'Authentication error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white mb-3 shadow-lg shadow-indigo-600/30">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {isLoginTab ? 'Sign in to your Account' : 'Create a New Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            JWT Authentication with MongoDB local persistence
          </p>
        </div>

        {/* Quick Demo Pre-fill helpers */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium pl-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Demo:
          </span>
          <button
            type="button"
            onClick={() => handleQuickFill('user')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-medium transition-all"
          >
            Demo User
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('admin')}
            className="px-2 py-1 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 rounded-lg text-[11px] font-medium transition-all"
          >
            New Admin
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950 p-1 rounded-xl mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              isLoginTab
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(false);
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isLoginTab
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Assigned Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    role === 'user'
                      ? 'bg-indigo-950/60 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block font-semibold">User Role</span>
                  <span className="text-[10px] text-slate-400">Standard Access</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    role === 'admin'
                      ? 'bg-amber-950/60 border-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block font-semibold text-amber-400">Admin Role</span>
                  <span className="text-[10px] text-slate-400">Can access /admin</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span>{isLoginTab ? 'Sign In & Issue JWT' : 'Create Account & Auto-Login'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
