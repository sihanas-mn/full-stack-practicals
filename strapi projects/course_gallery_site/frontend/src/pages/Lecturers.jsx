import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Briefcase, Award, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import LecturerCard from '../components/LecturerCard';

const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/public/lecturers');
        if (res.data?.success) {
          setLecturers(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load lecturers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLecturers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Academic Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Distinguished Faculty
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Our professors and industry practitioners bring decades of research, Silicon Valley engineering, and pedagogical leadership to your learning experience.
          </p>
        </div>

        {/* Lecturers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {lecturers.map((lecturer) => (
              <LecturerCard key={lecturer.id} lecturer={lecturer} />
            ))}
          </div>
        )}

        {/* Join Faculty / Inquire Banner */}
        <div className="mt-16 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold mb-2">Want to learn with personal mentorship?</h3>
            <p className="text-slate-300 text-sm">
              Our faculty members conduct weekly office hours, code reviews, and live architectural workshops for all enrolled students.
            </p>
          </div>
          <Link
            to="/courses"
            className="px-6 py-3.5 rounded-xl gradient-accent font-semibold text-sm text-white shadow-md hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2"
          >
            <span>Explore Faculty Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
