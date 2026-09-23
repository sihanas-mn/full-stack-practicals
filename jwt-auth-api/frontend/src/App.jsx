import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TokenFacility from './components/TokenFacility';
import DashboardView from './components/DashboardView';
import CoursesView from './components/CoursesView';
import ApiTester from './components/ApiTester';
import ProfileView from './components/ProfileView';
import AuthModal from './components/AuthModal';
import { getCookie, deleteCookie, parseJwt, setCookie } from './api/authApi';
import { Shield, Sparkles, CheckCircle2, AlertCircle, Info, ExternalLink } from 'lucide-react';

export default function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('jwt_token') || getCookie('token') || '';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jwt_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Transport mode: 'both' | 'cookie' | 'header'
  const [transportMode, setTransportMode] = useState(() => {
    return localStorage.getItem('jwt_transport_mode') || 'both';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFacility, setShowFacility] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const notify = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync token changes to storage and cookie
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwt_token', token);
      // Ensure cookie has it as well
      if (!getCookie('token')) {
        setCookie('token', token, 1);
      }
    } else {
      localStorage.removeItem('jwt_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('jwt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jwt_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('jwt_transport_mode', transportMode);
  }, [transportMode]);

  const handleAuthSuccess = (userData, tokenString) => {
    setUser(userData);
    setToken(tokenString);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch {
      // Ignore network errors on logout
    }

    setToken('');
    setUser(null);
    deleteCookie('token');
    deleteCookie('jwt');
    notify('Logged out successfully. Token and cookies cleared.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-xs font-medium backdrop-blur-xl ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50 shadow-emerald-500/10'
                : toast.type === 'error'
                ? 'bg-red-950/90 text-red-200 border-red-500/50 shadow-red-500/10'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 text-amber-200 border-amber-500/50 shadow-amber-500/10'
                : 'bg-indigo-950/90 text-indigo-200 border-indigo-500/50 shadow-indigo-500/10'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-400" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        user={user}
        token={token}
        transportMode={transportMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onToggleFacility={() => setShowFacility(!showFacility)}
        showFacility={showFacility}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Token Transport & Cookie Facility */}
        {showFacility && (
          <TokenFacility
            token={token}
            setToken={setToken}
            transportMode={transportMode}
            setTransportMode={setTransportMode}
            onNotify={notify}
          />
        )}

        {/* Tab Views */}
        {activeTab === 'dashboard' && (
          <DashboardView
            token={token}
            transportMode={transportMode}
            user={user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNotify={notify}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            token={token}
            transportMode={transportMode}
            user={user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNotify={notify}
          />
        )}

        {activeTab === 'playground' && (
          <ApiTester
            token={token}
            transportMode={transportMode}
            user={user}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            token={token}
            transportMode={transportMode}
            user={user}
            onNotify={notify}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>MongoDB Local Active (<code className="text-slate-400">127.0.0.1:27017/jwt_auth_db</code>)</span>
          </div>
          <div>
            Built with React 19 + Tailwind CSS v4 + Express JWT
          </div>
        </div>
      </footer>

      {/* Login & Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        onNotify={notify}
      />
    </div>
  );
}
