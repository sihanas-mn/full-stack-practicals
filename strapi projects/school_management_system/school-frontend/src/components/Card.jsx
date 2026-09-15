import React from "react";

export default function Card({
  children,
  className = "",
  hover = true,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col transition-all duration-200 ${
        hover ? "hover:shadow-md hover:border-slate-300" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-5 py-4 border-b border-slate-100 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = "" }) {
  return <div className={`p-5 flex-1 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = "" }) {
  return (
    <div className={`px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-3 text-xs ${className}`}>
      {children}
    </div>
  );
};
