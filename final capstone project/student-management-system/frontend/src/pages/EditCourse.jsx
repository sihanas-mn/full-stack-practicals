import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UploadCloud,
  Image as ImageIcon,
  Trash2
} from "lucide-react";
import Loading from "../components/Loading";
import { getImageUrl } from "../utils/imageUtils";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    description: "",
    duration: "",
    fee: "",
    status: "Active",
    bannerImage: ""
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        const c = res.data.course;
        setForm({
          courseCode: c.courseCode || "",
          courseName: c.courseName || "",
          description: c.description || "",
          duration: c.duration || "",
          fee: c.fee !== undefined ? c.fee : "",
          status: c.status || "Active",
          bannerImage: c.bannerImage || ""
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load course details"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file for the course banner.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Banner image size must be less than 5MB.");
      return;
    }

    setError("");
    setUploadingBanner(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload/course-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setForm((prev) => ({ ...prev, bannerImage: res.data.url }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload course banner.");
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleRemoveBanner = () => {
    setForm((prev) => ({ ...prev, bannerImage: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.put(`/courses/${id}`, {
        ...form,
        fee: Number(form.fee)
      });
      navigate("/courses");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update course"
      );
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loading message="Loading course specifications..." />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-4">
        <Link
          to="/courses"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Edit Course: {form.courseCode}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update fee, curriculum title, duration and active availability.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800 space-y-6"
      >
        {/* Course Banner Upload Section */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Course Banner Image (Optional)
          </label>

          {form.bannerImage ? (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 group">
              <img
                src={getImageUrl(form.bannerImage)}
                alt="Course Banner Preview"
                className="h-44 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[1px]">
                <label
                  htmlFor="change-course-banner"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 px-3.5 py-2 text-xs font-semibold shadow-md cursor-pointer transition-transform hover:scale-105"
                >
                  <UploadCloud className="h-4 w-4" />
                  <span>Change Banner</span>
                  <input
                    id="change-course-banner"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    disabled={uploadingBanner}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleRemoveBanner}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 text-xs font-semibold shadow-md transition-transform hover:scale-105 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-800/40 p-6 text-center transition-colors">
              <label
                htmlFor="course-banner-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {uploadingBanner ? (
                  <div className="flex flex-col items-center py-2">
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-2" />
                    <span className="text-xs font-medium text-slate-500">
                      Uploading course banner...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-2">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Upload course banner image
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      PNG, JPG, WEBP up to 5MB (Recommended: 1200x600 px)
                    </span>
                  </>
                )}
                <input
                  id="course-banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  disabled={uploadingBanner}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Course Code *
            </label>
            <input
              type="text"
              name="courseCode"
              placeholder="e.g. MERN001"
              value={form.courseCode}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 uppercase focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all font-mono font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Course Name *
            </label>
            <input
              type="text"
              name="courseName"
              placeholder="e.g. MERN Stack Development"
              value={form.courseName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Course Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Outline course learning objectives..."
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 6 Months"
              value={form.duration}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Course Fee (LKR) *
            </label>
            <input
              type="number"
              name="fee"
              min="0"
              placeholder="75000"
              value={form.fee}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Status *
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 py-2.5 px-3.5 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/courses"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating Course...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Update Course</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
