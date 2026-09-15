import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  GraduationCap, 
  Award, 
  Users, 
  Globe, 
  CheckCircle2, 
  Zap, 
  BookOpen,
  ChevronRight
} from 'lucide-react';
import api from '../api/axios';
import CourseCard from '../components/CourseCard';
import CategoryCard from '../components/CategoryCard';
import LecturerCard from '../components/LecturerCard';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesRes, categoriesRes, lecturersRes] = await Promise.all([
          api.get('/public/courses?pageSize=6'),
          api.get('/public/categories'),
          api.get('/public/lecturers'),
        ]);

        if (coursesRes.data?.success) setCourses(coursesRes.data.data);
        if (categoriesRes.data?.success) setCategories(categoriesRes.data.data);
        if (lecturersRes.data?.success) setLecturers(lecturersRes.data.data);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Glow blobs background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen Technical Academy • Enterprise 3-Tier Architecture</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Master Future-Proof Skills with{' '}
              <span className="gradient-text">World-Class Mentors</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              Explore hands-on curriculums in Full-Stack Engineering, Artificial Intelligence, Cloud DevOps, and Cybersecurity. Managed via Strapi CMS with secure token abstraction.
            </p>

            {/* Hero Search Bar */}
            <form
              onSubmit={handleHeroSearch}
              className="flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl mb-12"
            >
              <div className="relative w-full flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn? (e.g. React, AI, AWS)"
                  className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl gradient-accent font-semibold text-sm text-white shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick stats counter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">50+</p>
                <p className="text-xs text-slate-400 mt-0.5">Accredited Courses</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">20+</p>
                <p className="text-xs text-slate-400 mt-0.5">Senior Lecturers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">15,000+</p>
                <p className="text-xs text-slate-400 mt-0.5">Students Trained</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98%</p>
                <p className="text-xs text-slate-400 mt-0.5">Career Success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Featured Programs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Explore Popular Learning Paths
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Hand-picked courses designed by top industry practitioners.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specialization Categories Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Knowledge Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3">
              Browse by Academic Specialization
            </h2>
            <p className="text-sm text-slate-500">
              Pick your specialized discipline and accelerate your technical career trajectory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Distinguished Faculty / Lecturer Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Expert Instructors
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Learn from Industry Leaders
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Distinguished researchers, PhDs, and enterprise architects dedicated to your growth.
              </p>
            </div>
            <Link
              to="/lecturers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>Meet All Lecturers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lecturers.slice(0, 4).map((lecturer) => (
              <LecturerCard key={lecturer.id} lecturer={lecturer} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Value Proposition Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Industry Recognised Credentials</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
                Ready to take the next step in your professional journey?
              </h3>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Send an inquiry or enroll in our upcoming cohort. Receive customized advising from our faculty to select the program that aligns with your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl gradient-accent font-semibold text-sm text-white shadow-lg text-center hover:opacity-95 transition-opacity"
              >
                Inquire About a Course
              </Link>
              <Link
                to="/courses"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm text-center transition-colors"
              >
                Browse All 50+ Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
