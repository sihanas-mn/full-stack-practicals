import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  UserCircle,
  X
} from "lucide-react";

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
  }
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-4 transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0 md:shadow-none"
        }`}
      >
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold text-slate-800">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1.5 mt-2">
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
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
