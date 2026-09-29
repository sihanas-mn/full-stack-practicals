import { useState } from "react";
import {
  X,
  Printer,
  RotateCw,
  GraduationCap,
  QrCode,
  ShieldCheck,
  Phone,
  MapPin,
  Calendar,
  Sparkles
} from "lucide-react";

const StudentIDCardModal = ({ student, isOpen, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDOB = student.dateOfBirth
    ? new Date(student.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : "N/A";

  const issueYear = new Date().getFullYear();
  const expiryYear = issueYear + 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Scoped print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-student-id-card, #printable-student-id-card * {
            visibility: visible;
          }
          #printable-student-id-card {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between no-print border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Digital Student ID Pass
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official institutional credential & printable identity badge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* The Card Element */}
        <div className="flex justify-center py-2">
          <div
            id="printable-student-id-card"
            className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 dark:border-slate-700 bg-linear-to-br from-slate-900 via-slate-850 to-indigo-950 text-white select-none transition-all duration-300"
          >
            {!isFlipped ? (
              /* FRONT OF ID CARD */
              <div className="relative h-full flex flex-col justify-between p-4 bg-linear-to-b from-blue-900/50 via-slate-900/80 to-slate-950">
                {/* Institute Header */}
                <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black tracking-wider uppercase leading-none">
                        Apex Institute
                      </h3>
                      <p className="text-[9px] text-blue-300 font-medium tracking-wide">
                        HIGHER EDUCATION & TECHNOLOGY
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="h-3 w-3" />
                    STUDENT
                  </span>
                </div>

                {/* Card Middle: Photo + Information */}
                <div className="flex items-center gap-3.5 my-auto">
                  {/* Photo / Avatar */}
                  <div className="relative shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 font-extrabold text-2xl text-white shadow-md ring-2 ring-white/20">
                      {student.firstName[0]}
                      {student.lastName[0]}
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-slate-900 text-[10px]">
                      ✓
                    </span>
                  </div>

                  {/* Student Details */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-base font-black truncate leading-tight tracking-tight">
                      {student.firstName} {student.lastName}
                    </h4>
                    <p className="text-xs font-mono font-bold text-blue-400">
                      ID: {student.studentId}
                    </p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-slate-300 pt-1">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">
                          Date of Birth
                        </span>
                        <span className="font-semibold">{formattedDOB}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">
                          Gender
                        </span>
                        <span className="font-semibold">{student.gender}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Barcode & Validity */}
                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px]">
                  <div className="space-y-0.5">
                    {/* Simulated realistic barcode bars */}
                    <div className="flex items-end gap-[1.5px] h-5 opacity-85">
                      {[4, 2, 6, 3, 5, 2, 7, 4, 3, 6, 2, 5, 7, 3, 4, 6, 2, 5, 3, 7, 4, 2, 6].map(
                        (h, idx) => (
                          <div
                            key={idx}
                            className="w-[2px] bg-white rounded-xs"
                            style={{ height: `${h * 2.5}px` }}
                          />
                        )
                      )}
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-slate-400">
                      *{student.studentId}*
                    </span>
                  </div>

                  <div className="text-right text-slate-400">
                    <div>Valid Session: <span className="text-white font-semibold">{issueYear}-{expiryYear}</span></div>
                    <div className="text-emerald-400 font-bold uppercase tracking-wider text-[8px]">
                      Status: Active Pass
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* BACK OF ID CARD */
              <div className="relative h-full flex flex-col justify-between p-4 bg-linear-to-b from-slate-900 to-slate-950 text-slate-300">
                {/* Magnetic Stripe representation */}
                <div className="-mx-4 -mt-4 h-9 bg-slate-950 border-b border-white/10 flex items-center justify-end px-4">
                  <span className="text-[8px] font-mono text-slate-500">
                    APEX-SM-CHIP-V2.4
                  </span>
                </div>

                {/* Back Details */}
                <div className="space-y-2 py-1 text-[10px]">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[9px]">Campus / Residential:</span>
                      <span className="text-slate-200 leading-snug">{student.address || "Main Campus Hall"}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[9px]">Emergency Guardian Contact:</span>
                      <span className="text-slate-200 font-semibold">{student.guardianName || "Guardian"} ({student.guardianPhone || student.phone})</span>
                    </div>
                  </div>

                  <p className="text-[8px] text-slate-400 leading-relaxed border-t border-white/10 pt-1.5">
                    This card is non-transferable and remains institute property. If found, please return to the Academic Registry Desk.
                  </p>
                </div>

                {/* Signature and verification seal */}
                <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="h-6 w-6 text-white/80" />
                    <span className="text-[8px] font-mono text-slate-400 leading-tight">
                      SCAN FOR<br />VERIFICATION
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="font-serif italic text-xs text-blue-300">
                      R. K. Wickramasinghe
                    </div>
                    <span className="text-[8px] text-slate-400 uppercase tracking-wider">
                      Academic Registrar
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Controls */}
        <div className="flex items-center justify-between no-print border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>{isFlipped ? "View Front Side" : "View Back Side"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print ID Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCardModal;
