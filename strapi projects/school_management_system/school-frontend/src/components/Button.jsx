import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  isLoading = false,
  disabled = false,
  onClick,
  icon: Icon,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500 border border-transparent",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm focus:ring-slate-400",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500 border border-transparent",
    outline:
      "bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600 focus:ring-blue-500",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-400 border border-transparent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" color={variant === "primary" || variant === "danger" ? "white" : "current"} />
      ) : Icon ? (
        <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
