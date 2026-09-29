import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
      {/* Ambient background glow accents for depth */}
      <div className="fixed top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-indigo-500/5 dark:bg-purple-600/10 blur-3xl pointer-events-none" />

      <Navbar onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
