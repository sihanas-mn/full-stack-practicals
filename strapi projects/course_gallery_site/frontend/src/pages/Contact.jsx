import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import api from '../api/axios';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const initialCourseId = searchParams.get('course_id') || '';

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      course_id: initialCourseId,
      message: '',
    },
  });

  // Load course list for dropdown selection
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await api.get('/public/courses?pageSize=50');
        if (res.data?.success) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load courses for inquiry form:', err);
      }
    };
    loadCourses();
  }, []);

  // Update selected course if param changes
  useEffect(() => {
    if (initialCourseId) {
      setValue('course_id', initialCourseId);
    }
  }, [initialCourseId, setValue]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setSubmitSuccess(null);
      setSubmitError(null);

      const payload = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        course_id: data.course_id ? Number(data.course_id) : null,
        message: data.message,
      };

      const res = await api.post('/public/inquiries', payload);
      if (res.data?.success) {
        setSubmitSuccess(res.data.message || 'Your inquiry was submitted successfully!');
        reset();
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setSubmitError(
        err.errors?.map((e) => e.msg).join(', ') ||
        err.message ||
        'Failed to submit inquiry. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
            <Mail className="w-4 h-4" />
            <span>Admissions & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Course Inquiries & Enrollment
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Have questions regarding curriculum details, tuition grants, or schedule compatibility? Submit an inquiry and our admissions team will connect with you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact info & Platform trust badges (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <span>Admissions Office</span>
              </h3>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Academic Campus</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tech Knowledge Park, 42 Innovation Way, Colombo 03, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Email Admissions</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      admissions@coursegallery.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Telephone Helpline</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      +94 11 234 5678 (Mon - Sat, 8:30 AM - 6:00 PM)
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & Architecture Trust Badge */}
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-slate-900 rounded-xl p-4 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secure API Gateway Architecture</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    All inquiry submissions are securely validated through our Express Gateway and recorded to Strapi CMS with strict rate-limiting and zero client token exposure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Submit an Academic Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Please complete the form below. Required fields are marked with an asterisk (*).
              </p>

              {/* Success Notification Alert */}
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Inquiry Received</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">{submitSuccess}</p>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Submission Failed</h4>
                    <p className="text-xs text-rose-700 mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      {...register('full_name', {
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name must have at least 2 characters' },
                      })}
                      placeholder="e.g. John Doe"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                        errors.full_name
                          ? 'border-rose-300 focus:ring-rose-500'
                          : 'border-slate-200 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                  {errors.full_name && (
                    <p className="text-xs text-rose-600 mt-1">{errors.full_name.message}</p>
                  )}
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email address is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        placeholder="john@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-300 focus:ring-rose-500'
                            : 'border-slate-200 focus:ring-indigo-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[\d\s+\-()]{7,20}$/,
                            message: 'Valid phone number is required',
                          },
                        })}
                        placeholder="+94 77 123 4567"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? 'border-rose-300 focus:ring-rose-500'
                            : 'border-slate-200 focus:ring-indigo-500'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Course of Interest */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course of Interest
                  </label>
                  <select
                    {...register('course_id')}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="">General Inquiry / Not Sure Yet</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.course_title} ({c.course_code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Inquiry Details & Questions *
                  </label>
                  <textarea
                    rows={4}
                    {...register('message', {
                      required: 'Please provide details about your inquiry',
                      minLength: { value: 5, message: 'Message must have at least 5 characters' },
                    })}
                    placeholder="Tell us about your learning background, schedule preferences, or any specific questions about the curriculum..."
                    className={`w-full p-3.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-rose-300 focus:ring-rose-500'
                        : 'border-slate-200 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl gradient-accent text-white font-bold text-sm shadow-md hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
