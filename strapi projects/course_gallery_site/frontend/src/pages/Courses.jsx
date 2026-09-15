import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  BookOpen, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import api from '../api/axios';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ pagination: { page: 1, total: 0, pageCount: 1 } });

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'all');
  const [selectedMode, setSelectedMode] = useState(searchParams.get('delivery_mode') || 'all');
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || '');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  // Load Categories for filter dropdowns
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get('/public/categories');
        if (res.data?.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  // Synchronize URL search params with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedLevel && selectedLevel !== 'all') params.set('level', selectedLevel);
    if (selectedMode && selectedMode !== 'all') params.set('delivery_mode', selectedMode);
    if (selectedSort) params.set('sort', selectedSort);
    if (currentPage > 1) params.set('page', currentPage.toString());

    setSearchParams(params, { replace: true });
  }, [search, selectedCategory, selectedLevel, selectedMode, selectedSort, currentPage]);

  // Fetch Courses with filters
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: '9',
        });
        if (search) query.set('search', search);
        if (selectedCategory && selectedCategory !== 'all') query.set('category', selectedCategory);
        if (selectedLevel && selectedLevel !== 'all') query.set('level', selectedLevel);
        if (selectedMode && selectedMode !== 'all') query.set('delivery_mode', selectedMode);
        if (selectedSort) query.set('sort', selectedSort);

        const res = await api.get(`/public/courses?${query.toString()}`);
        if (res.data?.success) {
          setCourses(res.data.data);
          setMeta(res.data.meta);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [search, selectedCategory, selectedLevel, selectedMode, selectedSort, currentPage]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedMode('all');
    setSelectedSort('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore All Courses
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
            Filter by academic specialization, experience level, delivery mode, or price to find your ideal program.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm mb-8 space-y-4">
          {/* Top Row: Search & Reset */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <SearchBar
                value={search}
                onChange={(val) => {
                  setSearch(val);
                  setCurrentPage(1);
                }}
                onClear={() => {
                  setSearch('');
                  setCurrentPage(1);
                }}
                placeholder="Search by course title, code, or keyword..."
              />
            </div>

            <button
              onClick={handleResetFilters}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Bottom Row: Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Course Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Delivery Mode Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Delivery Mode
              </label>
              <select
                value={selectedMode}
                onChange={(e) => {
                  setSelectedMode(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Delivery Modes</option>
                <option value="Online">Online</option>
                <option value="Physical">Physical</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Sort Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Sort By
              </label>
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Default Sorting</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Count Display */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-800">{courses.length}</strong> of{' '}
            <strong className="text-slate-800">{meta?.pagination?.total || courses.length}</strong> programs
          </span>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 p-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No courses match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Try adjusting your search terms or resetting filters to view all available educational courses.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl gradient-accent text-white text-xs font-semibold shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={meta?.pagination?.pageCount || 1}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 150, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};

export default Courses;
