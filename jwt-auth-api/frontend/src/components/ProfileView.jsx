import React, { useEffect, useState } from 'react';
import { User, Shield, Key, Mail, CheckCircle2, Clock, Calendar, RefreshCw } from 'lucide-react';
import { makeApiRequest, parseJwt } from '../api/authApi';

export default function ProfileView({ token, transportMode, user, onNotify }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenSource, setTokenSource] = useState(null);

  const decoded = parseJwt(token);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');

    const res = await makeApiRequest('/profile', { method: 'GET' }, transportMode, token);
    if (res.ok) {
      setProfile(res.data.user);
      setTokenSource(res.data.authenticatedVia);
    } else {
      setError(res.data.message || 'Failed to fetch profile');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [token, transportMode]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-indigo-600/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <User className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {user?.name || profile?.name || 'Authenticated User'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {user?.email || 'User Profile Data'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchProfile}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                Account Role
              </span>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                  (user?.role || profile?.role) === 'admin'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                }`}
              >
                {user?.role || profile?.role || 'user'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                Verification Source
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Authenticated via {tokenSource || 'JWT'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                User MongoDB ID
              </span>
              <span className="text-xs font-mono text-slate-300">
                {profile?.userId || profile?._id || user?.id || '—'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                Session Expiry
              </span>
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {decoded?.exp
                  ? new Date(decoded.exp * 1000).toLocaleString()
                  : '1 Hour Default'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
