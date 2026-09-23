import React, { useState } from 'react';
import { Terminal, Send, CheckCircle, AlertOctagon, Clock, ShieldAlert, FileText, ArrowRight } from 'lucide-react';
import { makeApiRequest } from '../api/authApi';

const ENDPOINTS = [
  {
    path: '/profile',
    method: 'GET',
    label: 'Profile Route',
    description: 'Requires valid JWT (Header or Cookie). Returns user ID and role.',
    requiredRole: 'Any'
  },
  {
    path: '/dashboard',
    method: 'GET',
    label: 'Dashboard Stats Route',
    description: 'Fetches populated dashboard analytics & widget metrics.',
    requiredRole: 'Any'
  },
  {
    path: '/courses',
    method: 'GET',
    label: 'Courses Catalog Route',
    description: 'Fetches all 5 populated courses from MongoDB.',
    requiredRole: 'Any'
  },
  {
    path: '/admin',
    method: 'GET',
    label: 'Admin Only Route',
    description: 'Requires JWT with role="admin". Returns 403 Forbidden for role="user"!',
    requiredRole: 'admin'
  }
];

export default function ApiTester({ token, transportMode, user }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleRunTest = async (ep = selectedEndpoint) => {
    setTesting(true);
    setResult(null);

    const res = await makeApiRequest(ep.path, { method: ep.method }, transportMode, token);
    setResult(res);
    setTesting(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Interactive API & JWT Route Tester
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Trigger protected endpoints to verify Header vs Cookie transport, status codes, and role authorizations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Endpoints Selector Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Available Endpoints
          </div>
          {ENDPOINTS.map((ep) => {
            const isSelected = selectedEndpoint.path === ep.path;
            const isAdmin = ep.requiredRole === 'admin';

            return (
              <button
                key={ep.path}
                onClick={() => {
                  setSelectedEndpoint(ep);
                  handleRunTest(ep);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                      {ep.method}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-200">
                      /api/auth{ep.path}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isAdmin
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isAdmin ? 'Admin Only' : 'Authenticated'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {ep.description}
                </p>
              </button>
            );
          })}

          <button
            onClick={() => handleRunTest(selectedEndpoint)}
            disabled={testing}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {testing ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Execute Request</span>
              </>
            )}
          </button>
        </div>

        {/* Request & Response Live Viewer Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  HTTP Client Inspector
                </span>
              </div>

              {result && (
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {result.latency} ms
                  </span>
                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                      result.status === 200 || result.status === 201
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : result.status === 401
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {result.status} {result.statusText}
                  </span>
                </div>
              )}
            </div>

            {/* Request Summary info */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/40 text-xs font-mono space-y-1.5">
              <div className="text-slate-400">
                <span className="text-slate-500">Target:</span>{' '}
                <span className="text-indigo-300 font-semibold">{selectedEndpoint.method}</span>{' '}
                <span>http://localhost:5000/api/auth{selectedEndpoint.path}</span>
              </div>
              <div className="text-slate-400">
                <span className="text-slate-500">Transport:</span>{' '}
                <span className="text-purple-300 font-bold uppercase">{transportMode}</span>
              </div>
              <div className="text-slate-400">
                <span className="text-slate-500">Authorization Header:</span>{' '}
                <span className="text-slate-300">
                  {transportMode === 'header' || transportMode === 'both'
                    ? token
                      ? 'Bearer ' + token.substring(0, 24) + '...'
                      : '(None - Empty)'
                    : '(Disabled by Transport Mode)'}
                </span>
              </div>
              <div className="text-slate-400">
                <span className="text-slate-500">Credentials Cookie:</span>{' '}
                <span className="text-slate-300">
                  {transportMode === 'cookie' || transportMode === 'both'
                    ? 'credentials: include (token cookie sent)'
                    : 'Ignored'}
                </span>
              </div>
            </div>

            {/* Response Payload */}
            <div className="p-4 bg-slate-950 min-h-[260px] max-h-[380px] overflow-auto font-mono text-xs">
              {testing ? (
                <div className="flex items-center justify-center h-48 text-slate-500 gap-2">
                  <span className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  <span>Waiting for API response...</span>
                </div>
              ) : result ? (
                <pre className="text-emerald-400 leading-relaxed">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                  <FileText className="w-8 h-8 mb-2 opacity-40" />
                  <span>Select an endpoint and click "Execute Request" to inspect output.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
