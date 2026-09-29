import { useState } from "react";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
import {
  Palette,
  Sun,
  Moon,
  Sparkles,
  Check,
  Lock,
  KeyRound,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck
} from "lucide-react";

const Settings = () => {
  const {
    theme,
    setTheme,
    isDark,
    palette,
    setPalette,
    palettes,
    currentPalette
  } = useTheme();

  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });

      setSuccess(res.data.message || "Password updated successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
          Settings & Security
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Personalize system appearance, color themes, and manage your account credentials.
        </p>
      </div>

      {/* 1. Theme & Color Palette Customization Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 space-y-8">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Appearance & Color Theme
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your preferred visual mode and accent palette. Updates take effect immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Appearance Mode Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
            Appearance Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light Mode Card */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                !isDark
                  ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/20 ring-4 ring-blue-500/10 shadow-sm"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/60">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    Light Mode
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Clean, bright daytime interface
                  </span>
                </div>
              </div>
              {!isDark && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}
            </button>

            {/* Dark Mode Card */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                isDark
                  ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/20 ring-4 ring-blue-500/10 shadow-sm"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-amber-300 ring-1 ring-slate-700">
                  <Moon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">
                    Dark Mode
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Sleek, eye-friendly dark aesthetic
                  </span>
                </div>
              </div>
              {isDark && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Color Palette Selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Accent Color Palette
            </label>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Active: {currentPalette?.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {palettes.map((p) => {
              const isSelected = palette === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPalette(p.id)}
                  className={`group relative flex items-center gap-3.5 p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 ring-4 ring-blue-500/10 shadow-sm"
                      : "border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40"
                  }`}
                >
                  {/* Color Swatch Circle */}
                  <div
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: p.color }}
                  >
                    {isSelected && (
                      <Check className="h-5 w-5 text-white stroke-[2.5]" />
                    )}
                  </div>

                  {/* Palette Info */}
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-bold text-slate-900 dark:text-white truncate">
                      {p.name}
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {p.tagline}
                    </span>
                  </div>

                  {/* Gradient Indicator Strip */}
                  <div
                    className="h-7 w-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: p.color }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Live Theme Component Preview
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 dark:text-blue-300 ring-1 ring-blue-700/10">
              Interactive
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
            >
              <span>Primary Button</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 px-4 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300 ring-1 ring-blue-700/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all cursor-pointer"
            >
              <span>Subtle Badge</span>
            </button>

            <div className="relative flex-1 min-w-[180px]">
              <input
                type="text"
                readOnly
                value={`Palette: ${currentPalette.name}`}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-3 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden ring-2 ring-blue-600/30 transition-all font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Security & Password Change Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 space-y-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Password & Security
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Change your account password and review active security protection.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-900/50">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter your current password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 pl-10 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                New Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="At least 6 characters"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  minLength={6}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 pl-10 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  minLength={6}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 pl-10 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Info Card */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Security Recommendations
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Use a password with a minimum of 6 characters combining numbers, letters, and symbols.
                Sessions are secured with encrypted httpOnly tokens that automatically expire after 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
