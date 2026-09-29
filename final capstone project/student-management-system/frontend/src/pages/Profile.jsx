import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  Mail,
  Shield,
  Calendar,
  KeyRound,
  CheckCircle2,
  Settings,
  ArrowRight,
  Palette,
  User,
  Edit3,
  X,
  Save,
  AlertCircle,
  Loader2,
  Lock,
  BadgeCheck,
  Fingerprint,
  Camera,
  Trash2
} from "lucide-react";
import Loading from "../components/Loading";
import { getImageUrl } from "../utils/imageUtils";

const Profile = () => {
  const { user: authUser, updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingPic, setUploadingPic] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      setEditForm({
        name: res.data.user.name || "",
        email: res.data.user.email || ""
      });
    } catch (err) {
      console.error("Failed to load user profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!editForm.name.trim() || !editForm.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSaving(true);
    try {
      const res = await api.put("/auth/update-profile", {
        name: editForm.name.trim(),
        email: editForm.email.trim()
      });

      setUser(res.data.user);
      if (updateUser) {
        updateUser(res.data.user);
      }
      setSuccess("Profile information updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image file size must be less than 5MB.");
      return;
    }

    setError("");
    setUploadingPic(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setUser((prev) => ({ ...prev, profilePicture: res.data.profilePicture }));
      if (updateUser) {
        updateUser(res.data.user);
      }
      setSuccess("Profile picture updated successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload profile picture.");
    } finally {
      setUploadingPic(false);
    }
  };

  const handleRemoveProfilePic = async () => {
    if (!confirm("Are you sure you want to remove your profile picture?")) return;
    setError("");
    setUploadingPic(true);

    try {
      const res = await api.delete("/upload/profile-picture");
      setUser((prev) => ({ ...prev, profilePicture: "" }));
      if (updateUser) {
        updateUser(res.data.user);
      }
      setSuccess("Profile picture removed.");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove profile picture.");
    } finally {
      setUploadingPic(false);
    }
  };

  if (loading) {
    return <Loading message="Loading your account profile..." />;
  }

  const currentUser = user || authUser;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            User Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal identity, authorized privileges, and session security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700 transition-all cursor-pointer"
          >
            <Settings className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span>Settings & Security</span>
          </Link>
        </div>
      </div>

      {/* Alert Banners */}
      {success && (
        <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-900/50">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-900/50">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-800">
        {/* Banner with gradient */}
        <div
          className="h-32 sm:h-40 w-full relative transition-all duration-300"
          style={{ background: "var(--primary-gradient)" }}
        >
          {/* Subtle decorative glow overlay */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </div>

        {/* Profile Info Header - Guaranteed Zero-Overlap Structure */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          {/* Top Row: Avatar overlapping the banner, and Edit Action on the right */}
          <div className="flex items-end justify-between relative -mt-12 sm:-mt-16 mb-4">
            {/* Avatar with its own elevation & camera upload trigger */}
            <div className="relative group shrink-0">
              <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-4 ring-white dark:ring-slate-900 overflow-hidden">
                {uploadingPic ? (
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : currentUser?.profilePicture ? (
                  <img
                    src={getImageUrl(currentUser.profilePicture)}
                    alt={currentUser?.name}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center rounded-xl text-white font-extrabold text-3xl sm:text-4xl shadow-inner"
                    style={{ background: "var(--primary-gradient)" }}
                  >
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>

              {/* Upload Camera Button Badge */}
              <label
                htmlFor="profile-pic-input"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md ring-3 ring-white dark:ring-slate-900 cursor-pointer transition-transform hover:scale-110"
                title="Upload Profile Picture"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleProfilePicUpload}
                  disabled={uploadingPic}
                  className="hidden"
                />
              </label>
            </div>

            {/* Action buttons (Edit Profile / Cancel / Remove Picture) */}
            <div className="pt-2 flex items-center gap-2 flex-wrap justify-end">
              {currentUser?.profilePicture && !isEditing && (
                <button
                  type="button"
                  onClick={handleRemoveProfilePic}
                  disabled={uploadingPic}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-2 text-xs font-semibold ring-1 ring-slate-200 dark:ring-slate-700 transition-colors cursor-pointer"
                  title="Remove Profile Picture"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove Picture</span>
                </button>
              )}
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setError("");
                    setEditForm({
                      name: currentUser?.name || "",
                      email: currentUser?.email || ""
                    });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </div>

          {/* User Name & Identity Details: Always 100% cleanly below the avatar row */}
          <div className="space-y-1.5 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                {currentUser?.name}
              </h2>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  currentUser?.role === "admin"
                    ? "bg-violet-50 text-violet-700 ring-1 ring-violet-600/20 dark:bg-violet-950/60 dark:text-violet-400 dark:ring-violet-800/40"
                    : "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-950/60 dark:text-blue-400 dark:ring-blue-800/40"
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span className="uppercase">{currentUser?.role || "STAFF"}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                {currentUser?.email}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>Authorized Portal Personnel</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                ID: {currentUser?._id ? currentUser._id.slice(-6).toUpperCase() : ""}
              </span>
            </p>
          </div>

          {/* Inline Edit Form */}
          {isEditing && (
            <form
              onSubmit={handleEditSubmit}
              className="mb-8 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20 space-y-4 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Update Account Details
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Role cannot be self-modified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Your Full Name"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="user@institute.edu"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Identity & Account Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                <User className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Full Name</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {currentUser?.name || "Active User"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Email Address</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {currentUser?.email}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Access Level</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                {currentUser?.role === "admin" ? "Administrator" : "Faculty Staff"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Member Since</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {currentUser?.createdAt
                  ? new Date(currentUser.createdAt).toLocaleDateString()
                  : "Active"}
              </p>
            </div>
          </div>

          {/* Security & Authentication Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Authentication Status
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Encrypted session token active
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-600/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-slate-400 dark:text-slate-500">Method</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    httpOnly Cookie JWT
                  </span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-slate-400 dark:text-slate-500">Session Expiry</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    24-Hour Rolling
                  </span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-slate-400 dark:text-slate-500">Cross-Site Protection</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    SameSite Lax / None
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Fingerprint className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Password & Credentials
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Bcrypt salt hashed encryption
                    </p>
                  </div>
                </div>

                <Link
                  to="/settings"
                  className="inline-flex items-center gap-1 rounded-lg bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 ring-1 ring-slate-200 dark:ring-slate-700 shadow-2xs transition-colors"
                >
                  <Lock className="h-3 w-3" />
                  <span>Change</span>
                </Link>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-slate-400 dark:text-slate-500">Algorithm</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    bcrypt (10 rounds)
                  </span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-slate-400 dark:text-slate-500">Account ID</span>
                  <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    {currentUser?._id ? currentUser._id.slice(-8).toUpperCase() : "AUTHENTICATED"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-slate-400 dark:text-slate-500">Storage</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    MongoDB Isolated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts to Settings */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/40 dark:to-slate-900 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20 shrink-0">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-900 dark:text-white">
                  Appearance Mode & Color Palettes
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Switch light/dark themes or select among 7 tailored institutional color palettes.
                </span>
              </div>
            </div>

            <Link
              to="/settings"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition-all cursor-pointer shrink-0"
            >
              <span>Customize in Settings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
