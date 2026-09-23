import React, { useState } from 'react';
import { Key, Cookie, ShieldCheck, Copy, Check, Trash2, RefreshCw, Info, Lock, ArrowRight } from 'lucide-react';
import { setCookie, deleteCookie, getCookie, parseJwt } from '../api/authApi';

export default function TokenFacility({
  token,
  setToken,
  transportMode,
  setTransportMode,
  onNotify
}) {
  const [copied, setCopied] = useState(false);
  const [showFullToken, setShowFullToken] = useState(false);

  // Live cookie value from browser
  const currentCookie = getCookie('token') || getCookie('jwt') || '';
  const decoded = parseJwt(token);

  const handleCopy = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onNotify?.('Token copied to clipboard!', 'info');
  };

  const handleManualSetCookie = () => {
    if (!token) {
      onNotify?.('No token available to save to cookie. Please login first.', 'warning');
      return;
    }
    setCookie('token', token, 1);
    onNotify?.('JWT saved into browser cookie "token" successfully!', 'success');
  };

  const handleDeleteCookie = () => {
    deleteCookie('token');
    deleteCookie('jwt');
    onNotify?.('Browser auth cookies deleted.', 'warning');
  };

  const handleClearToken = () => {
    setToken('');
    deleteCookie('token');
    deleteCookie('jwt');
    onNotify?.('Local token state and browser cookies cleared.', 'info');
  };

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-5 mb-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base flex items-center gap-2">
              JWT Transport & Storage Facility
              <span className="text-[11px] font-normal text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                Active: {transportMode.toUpperCase()}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Configure whether requests authenticate via HTTP Header (<code className="text-purple-300">Authorization: Bearer</code>), Browser Cookie (<code className="text-purple-300">token=...</code>), or Both.
            </p>
          </div>
        </div>

        {token && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Token'}</span>
            </button>
            <button
              onClick={handleClearToken}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-lg border border-red-500/20 transition-all"
              title="Clear token and cookie"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Transport Mode Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {/* Option 1: Header Only */}
        <button
          onClick={() => {
            setTransportMode('header');
            onNotify?.('Switched to: Authorization Header Only (Bearer token).', 'info');
          }}
          className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
            transportMode === 'header'
              ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg shadow-purple-500/15'
              : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              1. Header Only
            </span>
            <Lock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-sm font-semibold text-slate-200">Authorization: Bearer</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Transmits token in the HTTP Authorization request header.
          </div>
        </button>

        {/* Option 2: Cookie Only */}
        <button
          onClick={() => {
            setTransportMode('cookie');
            if (token && !currentCookie) {
              setCookie('token', token, 1);
            }
            onNotify?.('Switched to: Browser Cookie Only (Credentials included).', 'info');
          }}
          className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
            transportMode === 'cookie'
              ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg shadow-purple-500/15'
              : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              2. Cookie Only
            </span>
            <Cookie className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-sm font-semibold text-slate-200">Cookie: token=...</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Leaves header blank and relies exclusively on browser cookies.
          </div>
        </button>

        {/* Option 3: Both Header and Cookie */}
        <button
          onClick={() => {
            setTransportMode('both');
            if (token && !currentCookie) {
              setCookie('token', token, 1);
            }
            onNotify?.('Switched to: Dual Mode (Header + Cookie).', 'info');
          }}
          className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
            transportMode === 'both'
              ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg shadow-purple-500/15'
              : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              3. Dual Facility (Recommended)
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-sm font-semibold text-slate-200">Header + Cookie</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Sends both Header and Cookie for maximum compatibility.
          </div>
        </button>
      </div>

      {/* Details Box: Raw Token & Decoded Payload & Cookie State */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/80">
        {/* Token Card */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                Active JWT Token String
              </span>
              {token && (
                <button
                  onClick={() => setShowFullToken(!showFullToken)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                >
                  {showFullToken ? 'Truncate' : 'Show Full'}
                </button>
              )}
            </div>

            {token ? (
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 break-all leading-relaxed">
                {showFullToken
                  ? token
                  : `${token.substring(0, 48)}...${token.substring(token.length - 24)}`}
              </div>
            ) : (
              <div className="p-3 bg-slate-900/50 rounded-lg border border-dashed border-slate-800 text-xs text-slate-500 text-center">
                No active token. Sign in or register to issue a JWT token.
              </div>
            )}
          </div>

          {/* Decoded Info */}
          {decoded && (
            <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">User ID:</span>
                <span className="font-mono text-slate-300 text-[11px]">{decoded.userId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Role:</span>
                <span className="font-semibold text-indigo-400 capitalize">{decoded.role}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Issued At:</span>
                <span className="text-slate-300 text-[11px]">
                  {new Date(decoded.iat * 1000).toLocaleTimeString()}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Expires In:</span>
                <span className="text-amber-400 text-[11px]">
                  {new Date(decoded.exp * 1000).toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Cookie State Card */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Cookie className="w-3.5 h-3.5 text-amber-400" />
                Browser Cookie State (<code className="text-amber-300">document.cookie</code>)
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  currentCookie
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {currentCookie ? 'Cookie Present' : 'No Cookie'}
              </span>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300 break-all leading-relaxed min-h-[46px] flex items-center">
              {currentCookie ? (
                `token=${currentCookie.substring(0, 36)}...`
              ) : (
                <span className="text-slate-500">Cookie not set in current browser session.</span>
              )}
            </div>
          </div>

          {/* Cookie Operations */}
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
            <button
              onClick={handleManualSetCookie}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-medium rounded-lg transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Set Token to Cookie</span>
            </button>
            <button
              onClick={handleDeleteCookie}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium rounded-lg transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Cookie</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
