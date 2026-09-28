import { useEffect, useState } from "react";
import api from "../services/api";
import {
  UserCircle,
  Mail,
  Shield,
  Calendar,
  KeyRound,
  CheckCircle2
} from "lucide-react";
import Loading from "../components/Loading";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to load user profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Loading message="Loading your account profile..." />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
          User Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Account details and security privileges for the active session.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-slate-200/80">
        {/* Banner with avatar */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 h-32 px-6 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-1 shadow-lg ring-4 ring-white">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-2xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 ring-1 ring-blue-700/10">
                <Shield className="h-3 w-3" />
                {user?.role?.toUpperCase() || "STAFF"}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">
                Authorized Institute Staff
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>Email Address</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {user?.email}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Shield className="h-4 w-4 text-slate-400" />
                <span>Security Role</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <KeyRound className="h-4 w-4 text-slate-400" />
                <span>Authentication Method</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                httpOnly JWT Cookie
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Member Since</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Active"}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50/60 p-4 border border-blue-100/80">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-900">
                  Secure Cookie-Based Session
                </p>
                <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                  Your JWT authentication credentials are safely preserved inside an
                  isolated, HTTP-Only browser cookie protected against XSS and client-side extraction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
