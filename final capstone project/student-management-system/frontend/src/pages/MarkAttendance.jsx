import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UserCheck,
  AlertTriangle,
  Info
} from "lucide-react";
import Loading from "../components/Loading";

const MarkAttendance = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [enrollments, setEnrollments] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Student attendance statuses keyed by student ObjectId: { [studentId]: { status: "Present", remarks: "" } }
  const [attendanceData, setAttendanceData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load active courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses?status=Active");
        const list = res.data.courses || [];
        setCourses(list);
        if (list.length > 0) {
          setSelectedCourse(list[0]._id);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load active courses"
        );
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Load active enrollments whenever selectedCourse changes
  useEffect(() => {
    if (!selectedCourse) {
      setEnrollments([]);
      return;
    }

    const fetchCourseEnrollments = async () => {
      setLoadingEnrollments(true);
      setError("");
      setSuccess("");
      try {
        const res = await api.get(
          `/enrollments?course=${selectedCourse}&status=Active`
        );
        const enrolledList = res.data.enrollments || [];
        setEnrollments(enrolledList);

        // Pre-fill default status "Present" for all enrolled students
        const initialMap = {};
        enrolledList.forEach((item) => {
          if (item.student?._id) {
            initialMap[item.student._id] = {
              status: "Present",
              remarks: ""
            };
          }
        });
        setAttendanceData(initialMap);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load enrolled students"
        );
      } finally {
        setLoadingEnrollments(false);
      }
    };

    fetchCourseEnrollments();
  }, [selectedCourse]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status
      }
    }));
  };

  const handleRemarksChange = (studentId, remarks) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks
      }
    }));
  };

  const handleSaveAttendance = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !date) {
      setError("Please select both course and date.");
      return;
    }

    if (enrollments.length === 0) {
      setError("No active students enrolled in this course to mark attendance.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    let successCount = 0;
    let duplicateCount = 0;
    const errors = [];

    for (const item of enrollments) {
      const studentId = item.student?._id;
      if (!studentId) continue;

      const record = attendanceData[studentId] || {
        status: "Present",
        remarks: ""
      };

      try {
        await api.post("/attendance", {
          student: studentId,
          course: selectedCourse,
          date,
          status: record.status,
          remarks: record.remarks
        });
        successCount++;
      } catch (err) {
        if (
          err.response?.status === 400 &&
          err.response?.data?.message?.includes("already marked")
        ) {
          duplicateCount++;
        } else {
          errors.push(
            err.response?.data?.message || "Error recording attendance"
          );
        }
      }
    }

    setSubmitting(false);

    if (errors.length > 0) {
      setError(errors[0]);
    } else if (successCount > 0 && duplicateCount === 0) {
      setSuccess(`Successfully marked attendance for ${successCount} student(s)!`);
      setTimeout(() => {
        navigate("/attendance");
      }, 1200);
    } else if (duplicateCount > 0 && successCount === 0) {
      setError(
        "Attendance has already been marked for these students on the selected date."
      );
    } else {
      setSuccess(
        `Marked ${successCount} new attendance record(s). (${duplicateCount} already existed).`
      );
      setTimeout(() => {
        navigate("/attendance");
      }, 1500);
    }
  };

  if (loadingCourses) {
    return <Loading message="Loading courses..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-4">
        <Link
          to="/attendance"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Mark Class Attendance
          </h1>
          <p className="text-sm text-slate-500">
            Select course and date to register daily attendance roll call.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 ring-1 ring-emerald-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {/* Course & Date Selector */}
      <div className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-slate-200/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Target Course *
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all font-medium"
            >
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseCode} - {c.courseName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Attendance Date *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-600/10 transition-all"
              required
            />
          </div>
        </div>
      </div>

      {/* Student Attendance List */}
      {loadingEnrollments ? (
        <Loading message="Loading enrolled students for this course..." />
      ) : enrollments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-4">
            <UserCheck className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No active students enrolled
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
            This course currently has no students with an "Active" enrollment status.
          </p>
          <div className="mt-6">
            <Link
              to="/enrollments/add"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span>Enroll Student in this Course</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveAttendance} className="space-y-6">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-slate-200/80">
            <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Enrolled Students ({enrollments.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Default status is set to Present. Adjust individual statuses as needed.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allPresent = {};
                    enrollments.forEach((e) => {
                      if (e.student?._id) {
                        allPresent[e.student._id] = {
                          status: "Present",
                          remarks: attendanceData[e.student._id]?.remarks || ""
                        };
                      }
                    });
                    setAttendanceData(allPresent);
                  }}
                  className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  All Present
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {enrollments.map((item) => {
                const s = item.student;
                if (!s) return null;
                const currentRecord = attendanceData[s._id] || {
                  status: "Present",
                  remarks: ""
                };

                return (
                  <div
                    key={s._id}
                    className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="sm:w-1/3">
                      <div className="font-semibold text-slate-900">
                        {s.firstName} {s.lastName}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-0.5">
                        <span className="text-blue-600 font-bold">{s.studentId}</span>
                        <span>•</span>
                        <span>Batch {item.batch}</span>
                      </div>
                    </div>

                    {/* Status Toggle Buttons */}
                    <div className="flex items-center gap-2">
                      {["Present", "Absent", "Late"].map((opt) => {
                        const isSelected = currentRecord.status === opt;
                        let activeStyles = "";
                        if (opt === "Present") {
                          activeStyles = isSelected
                            ? "bg-emerald-600 text-white shadow-sm ring-emerald-600"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100";
                        } else if (opt === "Absent") {
                          activeStyles = isSelected
                            ? "bg-rose-600 text-white shadow-sm ring-rose-600"
                            : "bg-rose-50 text-rose-700 hover:bg-rose-100";
                        } else {
                          activeStyles = isSelected
                            ? "bg-amber-500 text-white shadow-sm ring-amber-500"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100";
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleStatusChange(s._id, opt)}
                            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${activeStyles}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Remarks Input */}
                    <div className="md:w-1/3">
                      <input
                        type="text"
                        placeholder="Optional remarks..."
                        value={currentRecord.remarks}
                        onChange={(e) => handleRemarksChange(s._id, e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/10 transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              to="/attendance"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Attendance...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Save Attendance</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MarkAttendance;
