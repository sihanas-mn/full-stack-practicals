import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  Award, 
  Calendar, 
  Globe, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  Layers,
  ChevronRight,
  Share2
} from 'lucide-react';
import api from '../api/axios';

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/public/courses/${slug}`);
        if (res.data?.success) {
          setCourse(res.data.data);
        }
      } catch (err) {
        setError(err.message || 'Course could not be loaded');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-80 bg-slate-200 rounded-3xl mb-8" />
        <div className="h-10 w-2/3 bg-slate-200 rounded-xl mb-4" />
        <div className="h-20 bg-slate-200 rounded-xl mb-8" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Course Not Found</h2>
        <p className="text-slate-500 mb-6">{error || "The requested curriculum could not be retrieved."}</p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-white font-semibold text-sm shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </Link>
      </div>
    );
  }

  const {
    id,
    course_title,
    course_code,
    short_description,
    full_description,
    course_thumbnail,
    course_banner,
    category,
    lecturer,
    price,
    discount_price,
    currency = 'USD',
    duration,
    lesson_count,
    course_level,
    delivery_mode,
    start_date,
    end_date,
    requirements,
    what_you_learn,
    certification,
    featured_course,
  } = course;

  const currencySymbol = currency === 'LKR' ? 'Rs. ' : '$';
  const hasDiscount = discount_price && discount_price < price;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">{course_title}</span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden py-14 lg:py-20">
        <div className="absolute inset-0 opacity-20">
          <img
            src={
              typeof course_banner === 'string'
                ? course_banner
                : course_banner?.url ||
                  typeof course_thumbnail === 'string'
                  ? course_thumbnail
                  : course_thumbnail?.url ||
                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80'
            }
            alt={course_title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {category.name}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-slate-200">
                Code: {course_code}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                {course_level} Level
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                {delivery_mode}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {course_title}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              {short_description}
            </p>

            {/* Highlights bar */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Duration: <strong>{duration}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Lessons: <strong>{lesson_count} Modules</strong></span>
              </div>
              {start_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Starts: <strong>{new Date(start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Full Details, Outcomes, Requirements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview / Full Description Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span>Curriculum Overview</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {full_description || short_description}
              </div>
            </div>

            {/* What You Will Learn Card */}
            {what_you_learn && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>What You Will Master</span>
                </h2>
                <div className="space-y-3">
                  {what_you_learn.split('\n').filter(Boolean).map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{outcome.replace(/^[•\-\*]\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements Card */}
            {requirements && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                  Prerequisites & Eligibility
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {requirements}
                </p>
              </div>
            )}

            {/* Assigned Lecturer Profile Card */}
            {lecturer && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  Course Faculty Lead
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <img
                    src={
                      typeof lecturer.profile_image === 'string'
                        ? lecturer.profile_image
                        : lecturer.profile_image?.url ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                    }
                    alt={lecturer.name}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{lecturer.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 mb-1">{lecturer.designation}</p>
                    <p className="text-xs text-slate-500 mb-2">{lecturer.qualification}</p>
                    <p className="text-xs text-slate-600 line-clamp-2">{lecturer.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Enrollment & Pricing Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg sticky top-24 space-y-6">
              {/* Thumbnail preview */}
              <div className="rounded-xl overflow-hidden aspect-video bg-slate-100">
                <img
                  src={
                    typeof course_thumbnail === 'string'
                      ? course_thumbnail
                      : course_thumbnail?.url ||
                        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={course_title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price Tag */}
              <div>
                <span className="text-xs font-medium text-slate-400 block">Total Tuition Fee</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {currencySymbol}
                    {hasDiscount ? discount_price : price}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-slate-400 line-through">
                      {currencySymbol}{price}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      Save {Math.round(((price - discount_price) / price) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Action */}
              <div className="space-y-3">
                <Link
                  to={`/contact?course_id=${id}&course_title=${encodeURIComponent(course_title)}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-accent font-semibold text-sm text-white shadow-md hover:opacity-95 transition-opacity"
                >
                  <Mail className="w-4 h-4" />
                  <span>Inquire / Enroll in Course</span>
                </Link>

                <Link
                  to="/courses"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to All Courses</span>
                </Link>
              </div>

              {/* Course Meta Specs Checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-semibold text-slate-800">{duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Lessons:</span>
                  <span className="font-semibold text-slate-800">{lesson_count} Sessions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Level:</span>
                  <span className="font-semibold text-slate-800">{course_level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Delivery:</span>
                  <span className="font-semibold text-slate-800">{delivery_mode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Accredited Certificate:</span>
                  <span className="font-semibold text-emerald-600">
                    {certification ? 'Yes, Included' : 'Certificate of Completion'}
                  </span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100/80 flex items-start gap-2.5 text-[11px] text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>100% Secure admission via Express Gateway with HTTP-only cookie session protection.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
