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
  X,
  Sparkles,
  Server
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";

export const navSections = [
  {
    title: "Academic Lifecycle",
    links: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Students Directory", path: "/students", icon: Users },
      { name: "Courses Catalogue", path: "/courses", icon: BookOpen },
      { name: "Enrollments", path: "/enrollments", icon: GraduationCap },
      { name: "Attendance Records", path: "/attendance", icon: CalendarCheck }
    ]
  },
  {
    title: "Institutional Admin",
    links: [
      { name: "Staff Directory", path: "/staff", icon: ShieldCheck }
    ]
  },
  {
    title: "Preferences & Security",
    links: [
      { name: "User Profile", path: "/profile", icon: UserCircle },
      { name: "Settings & Security", path: "/settings", icon: Settings }
    ]
  }
];

// Flat links export for backward compatibility
export const links = navSections.flatMap((s) => s.links);

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-5 transition-all duration-300 ease-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0 md:shadow-none"
        }`}
      >
        <div className="flex-1 overflow-y-auto pr-1 -mr-1">
          {/* Top Brand & Close button */}
          <div className="flex items-center justify-between pb-5 mb-4 border-b border-slate-100 dark:border-slate-800">
            <BrandLogo size="md" showTagline={true} />
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 md:hidden transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="space-y-6">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {section.title}
                </span>

                <div className="space-y-1">
                  {section.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => {
                          if (onClose) onClose();
                        }}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-150 ${
                            isActive
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-1 ring-blue-500/50"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                              }`}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                            </div>
                            <span className="truncate">{link.name}</span>

                            {isActive && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-xs" />
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer with Status & Theme Switcher */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-4 space-y-3">
          {/* Institutional Node Badge */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 p-2.5 ring-1 ring-slate-100 dark:ring-slate-800 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200 leading-none">
                  Central Node
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Apex Network • Online
                </p>
              </div>
            </div>
            <span className="rounded-md bg-white dark:bg-slate-900 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 shadow-2xs border border-slate-200/60 dark:border-slate-700/60">
              v2.6
            </span>
          </div>

          <div className="flex items-center justify-between px-1 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400 text-[11px]">
              Theme & Palette
            </span>
            <ThemeToggle variant="button" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
