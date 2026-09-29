import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, Building2, Bell, Shield, Calendar } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getImageUrl } from "../utils/imageUtils";

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 px-4 md:px-6 backdrop-blur-xl transition-all duration-200">
      {/* Left: Mobile Toggle & Campus Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-xl p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white md:hidden transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Campus Context Pill */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Apex Institute of Higher Education
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/70 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 ring-1 ring-blue-700/20 dark:ring-blue-400/20">
                Main Campus
              </span>
            </div>
            <p className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>Session 2026/27</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls: Theme, User Capsule, Logout */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Dark Mode & Palette Indicator */}
        <ThemeToggle />

        {/* User Profile Capsule */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 py-1 pl-1 pr-3 ring-1 ring-slate-200/80 dark:ring-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 hover:ring-slate-300 dark:hover:ring-slate-600 transition-all cursor-pointer group shadow-2xs"
          title="Manage Profile & Security Settings"
        >
          {/* Avatar with Status Ring */}
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
              {user?.profilePicture ? (
                <img
                  src={getImageUrl(user.profilePicture)}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : user?.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                "U"
              )}
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-slate-900" />
          </div>

          {/* User Details */}
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {user?.name || "Academic User"}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {user?.role === "admin" ? "Administrator" : "Faculty Staff"}
              </span>
            </div>
          </div>
        </Link>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 ring-1 ring-rose-200/60 dark:ring-rose-900/40 transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Sign out of ApexEdu"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
