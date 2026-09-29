import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, ShieldCheck, KeyRound } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import BrandLogo from "../components/BrandLogo";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleQuickFill = (email, password) => {
    setForm({ email, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials or login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-radial from-slate-100 via-slate-50 to-blue-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/30 px-4 py-12 transition-colors duration-200 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-10 left-10 -z-10 h-80 w-80 rounded-full bg-blue-600/10 dark:bg-blue-500/15 blur-3xl pointer-events-none animate-ambient" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-indigo-600/10 dark:bg-indigo-500/15 blur-3xl pointer-events-none animate-ambient" />

      {/* Top right theme switcher */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-slate-200/80 dark:shadow-black/70 ring-1 ring-slate-200/80 dark:ring-slate-800 transition-all">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <BrandLogo size="lg" showBadge={true} showTagline={false} className="mb-3" />
          <h1 className="text-xl font-display font-black tracking-tight text-slate-900 dark:text-white mt-1">
            Enterprise Portal Sign In
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            Authenticate to manage student lifecycle, courses & institutional records
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-3 ring-1 ring-slate-100 dark:ring-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold mb-2">
            <KeyRound className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Quick Demo Credentials:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill("admin@example.com", "password123")}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-center cursor-pointer shadow-2xs"
            >
              👑 Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("staff@example.com", "password123")}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-center cursor-pointer shadow-2xs"
            >
              🎓 Staff Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3.5 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-4 font-semibold text-white shadow-md shadow-blue-600/25 hover:bg-blue-700 focus:outline-hidden focus:ring-4 focus:ring-blue-600/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Portal</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          New institutional staff?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Register Account
          </Link>
        </p>

        {/* Security Trust Stamp */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Enterprise 256-Bit TLS • Role Based Authorization</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
