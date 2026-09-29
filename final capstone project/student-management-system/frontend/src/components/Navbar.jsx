import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, LogOut, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getImageUrl } from "../utils/imageUtils";

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 md:px-6 backdrop-blur-md transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white md:hidden transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Student Management
            </h1>
            <p className="hidden md:block text-xs font-medium text-slate-500 dark:text-slate-400">
              Admin & Staff Portal
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Dark Mode Toggle */}
        <ThemeToggle />

        {/* User Pill Linking to Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 py-1.5 px-3 ring-1 ring-slate-200/60 dark:ring-slate-700/60 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 hover:ring-slate-300 dark:hover:ring-slate-600 transition-all cursor-pointer group"
          title="View Your Profile"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold group-hover:scale-105 transition-transform overflow-hidden">
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
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {user?.name}
            </span>
            <span className="block text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider mt-0.5">
              {user?.role || "Staff"}
            </span>
          </div>
        </Link>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2 text-xs md:text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 ring-1 ring-rose-200/50 dark:ring-rose-900/30 transition-colors shadow-2xs cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden xs:inline sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
