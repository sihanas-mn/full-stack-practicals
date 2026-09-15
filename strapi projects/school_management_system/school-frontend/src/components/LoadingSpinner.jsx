import React from "react";

export default function LoadingSpinner({
  size = "md",
  color = "primary",
  text = null,
  className = "",
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2.5",
    lg: "w-12 h-12 border-3",
  };

  const colorClasses = {
    primary: "border-blue-600 border-t-transparent",
    white: "border-white border-t-transparent",
    current: "border-current border-t-transparent",
    slate: "border-slate-500 border-t-transparent",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );
}
