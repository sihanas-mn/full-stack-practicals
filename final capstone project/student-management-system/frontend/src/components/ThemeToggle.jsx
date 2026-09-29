import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ variant = "icon", className = "" }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
          isDark
            ? "bg-slate-800 text-amber-300 hover:bg-slate-700/80 ring-1 ring-slate-700"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 ring-1 ring-slate-200"
        } ${className}`}
      >
        {isDark ? (
          <>
            <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === "toggle") {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDark ? "bg-blue-600" : "bg-slate-300"
        } ${className}`}
      >
        <span
          className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ${
            isDark ? "translate-x-6 text-blue-600" : "translate-x-0 text-amber-500"
          }`}
        >
          {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </span>
      </button>
    );
  }

  // Default "icon" variant: sleek, circular/rounded-xl button with micro-interaction
  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
        isDark
          ? "border-slate-700/80 bg-slate-800/90 text-amber-400 hover:bg-slate-700 hover:text-amber-300 hover:border-slate-600 shadow-xs"
          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-90" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 hover:-rotate-45" />
      )}
    </button>
  );
};

export default ThemeToggle;
