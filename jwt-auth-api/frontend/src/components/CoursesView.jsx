import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Lock,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { makeApiRequest } from '../api/authApi';

export default function CoursesView({
  token,
  transportMode,
  user,
  onOpenAuth,
  onNotify
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [tokenSource, setTokenSource] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setAuthError(null);

    const result = await makeApiRequest('/courses', { method: 'GET' }, transportMode, token);

    if (result.ok) {
      setCourses(result.data.courses || []);
      setTokenSource(result.data.authenticatedVia);
    } else {
      setAuthError(result.data.message || 'Unauthorized');
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, [token, transportMode]);

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());

    const matchLevel = selectedLevel === 'ALL' || c.level === selectedLevel;

    return matchSearch && matchLevel;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Populated Collection
            </span>
            {tokenSource && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified via {tokenSource}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Academic Courses Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse verified courses loaded from MongoDB local collection (<code className="text-indigo-300">courses</code>).
          </p>
        </div>

        {/* Search & Level Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search code, title, instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Error Display */}
      {authError && (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-dashed border-red-500/30 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">Protected API Endpoint</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            {authError}. Provide your JWT via header or cookie to unlock the courses database.
          </p>
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            Sign In with Demo Account
          </button>
        </div>
      )}

      {/* Courses List */}
      {!authError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((c) => (
            <div
              key={c._id || c.courseCode}
              className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-200 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {c.courseCode}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      c.level === 'Beginner'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : c.level === 'Intermediate'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    {c.level}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{c.instructor}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{c.department}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{c.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-slate-500" />
                  <span>{c.credits} Credits</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300 font-medium">
                  <Users className="w-3 h-3 text-indigo-400" />
                  <span>{c.enrolledStudents} Enrolled</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
