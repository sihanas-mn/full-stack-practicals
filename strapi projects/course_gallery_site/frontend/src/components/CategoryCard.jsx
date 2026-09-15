import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FolderKanban } from 'lucide-react';

const CategoryCard = ({ category }) => {
  if (!category) return null;

  const { name, slug, description, image, courseCount } = category;

  return (
    <Link
      to={`/courses?category=${slug}`}
      className="group relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col"
    >
      {/* Image / Banner Container */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={
            typeof image === 'string'
              ? image
              : image?.url ||
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
          }
          alt={name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-indigo-700 shadow-sm">
            <FolderKanban className="w-3.5 h-3.5" />
            {courseCount ? `${courseCount} Courses` : 'Specialization'}
          </span>
        </div>

        {/* Bottom category title over image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors flex items-center justify-between">
            <span>{name}</span>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-indigo-600 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
          <span>Explore Track</span>
          <span className="tracking-wide uppercase text-[10px] text-slate-400 font-medium">Curriculum</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
