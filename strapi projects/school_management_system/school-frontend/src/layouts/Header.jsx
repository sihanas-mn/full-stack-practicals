import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, Search, Sparkles } from "lucide-react";

export default function Header({ onMenuClick }) {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case "/":
        return { title: "Dashboard Overview", subtitle: "Real-time summary of school operations" };
      case "/teachers":
        return { title: "Teachers Management", subtitle: "Manage faculty profiles, assigned subjects and students" };
      case "/students":
        return { title: "Students Management", subtitle: "Track student enrollments, assigned classes and teachers" };
      case "/subjects":
        return { title: "Subjects & Curriculum", subtitle: "Organize academic subjects and assign faculty leads" };
      default:
        return { title: "School Management", subtitle: "Admin Portal" };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-none">{title}</h1>
            <p className="hidden sm:block text-xs text-slate-500 mt-1 font-normal">{subtitle}</p>
          </div>
        </div>

        {/* Right: Quick Indicators & Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Strapi API Connected</span>
          </div>

          <div className="flex items-center gap-2.5 pl-2 sm:border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-800">Admin Staff</div>
              <div className="text-[11px] text-slate-500">School Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
