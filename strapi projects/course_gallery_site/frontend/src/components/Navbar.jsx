import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Search, 
  BookOpen, 
  Users, 
  Mail, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import api from '../api/axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasSecureSession, setHasSecureSession] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Check secure session cookie status
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get('/public/auth/session');
        if (res.data?.authenticated) {
          setHasSecureSession(true);
        }
      } catch (err) {
        // Silent fail
      }
    };
    checkSession();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Lecturers', path: '/lecturers' },
    { name: 'Contact & Inquiries', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-md shadow-slate-900/5 py-3'
          : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Edu<span className="gradient-text">Gallery</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase font-semibold text-indigo-600">
                Course Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/courses"
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 bg-slate-100/80 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg gradient-accent hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enroll Now</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-100 mt-3 animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link
                  to="/courses"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Courses</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-lg gradient-accent shadow-md shadow-indigo-500/25"
                >
                  <span>Inquire / Enroll</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
