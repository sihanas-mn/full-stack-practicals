import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';

const CourseCard = ({ course }) => {
  if (!course) return null;

  const {
    course_title,
    slug,
    course_code,
    short_description,
    course_thumbnail,
    category,
    lecturer,
    price,
    discount_price,
    currency = 'USD',
    duration,
    lesson_count,
    course_level,
    delivery_mode,
    certification,
    featured_course,
  } = course;

  // Formatted price display
  const currencySymbol = currency === 'LKR' ? 'Rs. ' : '$';
  const hasDiscount = discount_price && discount_price < price;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col group">
      {/* Thumbnail container */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={
            typeof course_thumbnail === 'string'
              ? course_thumbnail
              : course_thumbnail?.url ||
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
          }
          alt={course_title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {category && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-indigo-700 shadow-sm">
              {category.name}
            </span>
          )}

          <div className="flex items-center gap-1.5 ml-auto">
            {featured_course && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-950 shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 backdrop-blur-md text-white">
              {delivery_mode}
            </span>
          </div>
        </div>

        {/* Bottom overlay: Course Code & Level */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
          <span className="bg-slate-900/60 backdrop-blur-sm px-2 py-0.5 rounded">
            {course_code}
          </span>
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-300" />
            {course_level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 leading-snug">
          <Link to={`/courses/${slug}`}>
            {course_title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed flex-1">
          {short_description}
        </p>

        {/* Metadata info pills */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 py-3 border-y border-slate-100 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{duration || 'Flexible'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>{lesson_count ? `${lesson_count} Lessons` : 'Curriculum'}</span>
          </div>
          {certification && (
            <div className="flex items-center gap-1 text-emerald-600 ml-auto">
              <Award className="w-3.5 h-3.5" />
              <span>Certified</span>
            </div>
          )}
        </div>

        {/* Lecturer info */}
        {lecturer && (
          <div className="flex items-center gap-2.5 mb-4">
            <img
              src={
                typeof lecturer.profile_image === 'string'
                  ? lecturer.profile_image
                  : lecturer.profile_image?.url ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
              }
              alt={lecturer.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100"
            />
            <div className="text-xs truncate">
              <p className="font-semibold text-slate-800 truncate">{lecturer.name}</p>
              <p className="text-slate-500 truncate">{lecturer.designation}</p>
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Tuition Fee</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">
                {currencySymbol}
                {hasDiscount ? discount_price : price}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {currencySymbol}{price}
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/courses/${slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white transition-all duration-200 group/btn"
          >
            <span>View Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
