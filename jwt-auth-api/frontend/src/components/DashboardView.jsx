import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Users,
  BookOpen,
  Award,
  Activity,
  DollarSign,
  Lock,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { makeApiRequest } from '../api/authApi';

// Icon map for metric cards
const ICON_MAP = {
  users: Users,
  'book-open': BookOpen,
  award: Award,
  activity: Activity,
  'dollar-sign': DollarSign
};

export default function DashboardView({
  token,
  transportMode,
  user,
  onOpenAuth,
  onNotify
}) {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [tokenSource, setTokenSource] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setAuthError(null);

    const result = await makeApiRequest('/dashboard', { method: 'GET' }, transportMode, token);

    if (result.ok) {
      setDashboardData(result.data.metrics || []);
      setTokenSource(result.data.authenticatedVia);
    } else {
      setAuthError(result.data.message || 'Unauthorized: Token required');
      setDashboardData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, [token, transportMode]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Top Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/40 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                JWT Protected Resource
              </span>
              {tokenSource && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified via {tokenSource}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              System & Analytics Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Live metrics populated in local MongoDB (<code className="text-indigo-300">dashboards</code> collection), protected with JSON Web Token verification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboard}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Error Fallback */}
      {authError && (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-dashed border-red-500/30 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">Authentication Required</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            {authError}. Provide a valid JWT via either <span className="text-purple-300 font-semibold">Cookie</span> or <span className="text-indigo-300 font-semibold">Authorization Header</span>.
          </p>
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            Sign In with Demo User
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      {dashboardData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || Activity;
            const isUp = item.trend === 'up';
            const isDown = item.trend === 'down';

            return (
              <div
                key={item._id || item.metricKey}
                className="group relative bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-200 shadow-lg shadow-black/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-200 mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {item.value}
                  </div>

                  {item.changePercentage !== 0 && (
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isUp
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : isDown
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isUp && <TrendingUp className="w-3 h-3" />}
                      {isDown && <TrendingDown className="w-3 h-3" />}
                      {!isUp && !isDown && <Minus className="w-3 h-3" />}
                      <span>
                        {isUp ? '+' : ''}
                        {item.changePercentage}%
                      </span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
