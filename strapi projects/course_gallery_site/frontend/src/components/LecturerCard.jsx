import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  ExternalLink, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const LecturerCard = ({ lecturer }) => {
  if (!lecturer) return null;

  const {
    id,
    name,
    designation,
    profile_image,
    bio,
    qualification,
    experience_years,
    specialization,
    email,
    linkedin,
    active_status,
  } = lecturer;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col group">
      {/* Top Banner & Avatar Header */}
      <div className="relative h-28 bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-800 p-4">
        {active_status && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 backdrop-blur-md border border-emerald-400/30">
            Active Faculty
          </span>
        )}
      </div>

      <div className="px-6 pb-6 flex-1 flex flex-col">
        {/* Avatar overlapping banner */}
        <div className="relative -mt-12 mb-4 flex items-end justify-between">
          <img
            src={
              typeof profile_image === 'string'
                ? profile_image
                : profile_image?.url ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            }
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300"
          />

          <div className="flex items-center gap-2">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label="Send email"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Lecturer Name & Designation */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        <p className="text-xs font-semibold text-indigo-600 mb-3">
          {designation}
        </p>

        {/* Bio */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
          {bio}
        </p>

        {/* Qualifications & Specialization */}
        <div className="space-y-2 py-3 border-y border-slate-100 mb-4 text-xs">
          <div className="flex items-start gap-2 text-slate-600">
            <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{qualification}</span>
          </div>
          <div className="flex items-start gap-2 text-slate-600">
            <Briefcase className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              {experience_years}+ Years Experience • <span className="text-slate-800 font-medium">{specialization}</span>
            </span>
          </div>
        </div>

        {/* Action Link */}
        <Link
          to={`/courses`}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-600 hover:text-white transition-all duration-200"
        >
          <span>View Courses by {name.split(' ')[0]}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default LecturerCard;
