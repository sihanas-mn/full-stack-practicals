import {
  X,
  Printer,
  Receipt,
  GraduationCap,
  CheckCircle,
  Building2
} from "lucide-react";

const FeeReceiptModal = ({ enrollment, isOpen, onClose }) => {
  if (!isOpen || !enrollment) return null;

  const handlePrint = () => {
    window.print();
  };

  const receiptNumber = `REC-${new Date().getFullYear()}-${enrollment._id
    .slice(-6)
    .toUpperCase()}`;

  const issueDate = enrollment.enrollmentDate
    ? new Date(enrollment.enrollmentDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

  const courseFee = enrollment.course?.fee !== undefined
    ? Number(enrollment.course.fee)
    : 75000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Scoped print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-fee-receipt, #printable-fee-receipt * {
            visibility: visible;
          }
          #printable-fee-receipt {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 24px;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 p-6 md:p-8 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Header Controls */}
        <div className="flex items-center justify-between no-print border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Official Tuition Fee Receipt
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Course enrollment billing voucher & financial statement
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

        {/* Printable Receipt Paper Container */}
        <div
          id="printable-fee-receipt"
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-6 md:p-8 space-y-6 text-slate-800 dark:text-slate-100"
        >
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-base font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
                  APEXEDU™ ACADEMY & INSTITUTE OF TECHNOLOGY
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Directorate of Bursar & Academic Accounts • Central Campus
                </p>
                <p className="text-[11px] text-slate-400">
                  Colombo Campus, Sri Lanka • Tel: +94 11 234 5678
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-600/20">
                OFFICIAL RECEIPT
              </span>
              <p className="mt-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {receiptNumber}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Issue Date: {issueDate}
              </p>
            </div>
          </div>

          {/* Student & Billing Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 p-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Student Recipient:
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {enrollment.student
                  ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
                  : "N/A"}
              </p>
              <p className="font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                Student ID: {enrollment.student?.studentId || "N/A"}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Email: {enrollment.student?.email || "-"}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Enrollment Details:
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Batch Allocation: <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{enrollment.batch}</span>
              </p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Payment Channel: Direct Institutional Clearance
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Academic Year: 2026/2027 Session
              </p>
            </div>
          </div>

          {/* Fee Itemization Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="py-2.5 px-4">Item Description</th>
                  <th className="py-2.5 px-4">Course Code</th>
                  <th className="py-2.5 px-4 text-center">Duration</th>
                  <th className="py-2.5 px-4 text-right">Fee (LKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {enrollment.course?.courseName || "Academic Program Tuition"}
                  </td>
                  <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400 font-bold">
                    {enrollment.course?.courseCode || "CR-001"}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">
                    {enrollment.course?.duration || "Standard Semester"}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                    Rs. {courseFee.toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800">
                <tr>
                  <td colSpan="3" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                    Total Tuition Paid
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    Rs. {courseFee.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-2 px-4 text-slate-500 text-[11px]">
                    Remaining Balance Due
                  </td>
                  <td className="py-2 px-4 text-right font-mono text-slate-500 font-semibold text-[11px]">
                    Rs. 0.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Verification stamp & signature footer */}
          <div className="flex items-center justify-between pt-3">
            {/* Green Official Stamp Effect */}
            <div className="border-2 border-dashed border-emerald-500/80 rounded-xl px-3.5 py-2 text-center -rotate-2 bg-emerald-50/50 dark:bg-emerald-950/20">
              <span className="block text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                ★ OFFICIAL VERIFIED ★
              </span>
              <span className="block text-[8px] font-mono text-emerald-700 dark:text-emerald-300">
                PAID IN FULL • {issueDate}
              </span>
            </div>

            <div className="text-right space-y-1">
              <div className="font-serif italic text-xs text-slate-700 dark:text-slate-300">
                H. M. Perera, FCMA
              </div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider border-t border-slate-200 dark:border-slate-700 pt-1">
                Authorized Bursar Signatory
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Controls */}
        <div className="flex items-center justify-end gap-3 no-print border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print Official Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeeReceiptModal;
