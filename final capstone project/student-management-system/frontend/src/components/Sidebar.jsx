import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  UserCircle,
  Settings,
  X
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Students",
    path: "/students",
    icon: Users
  },
  {
    name: "Staff",
    path: "/staff",
    icon: ShieldCheck
  },
  {
    name: "Courses",
    path: "/courses",
    icon: BookOpen
  },
  {
    name: "Enrollments",
    path: "/enrollments",
    icon: GraduationCap
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: CalendarCheck
  },
  {
    name: "Profile",
    path: "/profile",
    icon: UserCircle
  },
  {
    name: "Settings & Security",
    path: "/settings",
    icon: Settings
  }
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-all duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0 md:shadow-none"
        }`}
      >
        <div>
          {/* Mobile Header */}
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100 dark:border-slate-800 md:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold text-slate-800 dark:text-white">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 mt-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-100"
                    }`
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Theme Toggle */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <span className="font-medium text-slate-500 dark:text-slate-400">
              Appearance
            </span>
            <ThemeToggle variant="button" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
