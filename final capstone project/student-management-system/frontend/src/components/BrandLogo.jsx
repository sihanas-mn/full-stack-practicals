import React from "react";
import { GraduationCap, Sparkles } from "lucide-react";

export const BrandLogo = ({
  size = "md",
  showTagline = true,
  showBadge = true,
  className = ""
}) => {
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brand Icon Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 text-white shadow-md shadow-blue-600/25 ring-1 ring-white/20 shrink-0 ${
          isSm ? "h-9 w-9" : isLg ? "h-14 w-14 rounded-3xl" : "h-11 w-11"
        }`}
      >
        <GraduationCap className={isSm ? "h-5 w-5" : isLg ? "h-8 w-8" : "h-6 w-6"} />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-950 animate-ping" />
        </span>
      </div>

      {/* Brand Text */}
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <span
            className={`font-display font-black tracking-tight text-slate-900 dark:text-white ${
              isSm ? "text-base" : isLg ? "text-2xl" : "text-lg"
            }`}
          >
            Apex<span className="text-blue-600 dark:text-blue-400">Edu</span>
          </span>
          {showBadge && (
            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 dark:bg-blue-950/70 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 dark:text-blue-300 ring-1 ring-blue-700/20 dark:ring-blue-400/30">
              SIS
            </span>
          )}
        </div>
        {showTagline && (
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-tight">
            Academic Intelligence Suite
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
