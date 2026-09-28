import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
  danger = true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              danger ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
            }`}
          >
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{message}</p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-all shadow-sm disabled:opacity-50 flex items-center gap-2 ${
                  danger
                    ? "bg-rose-600 hover:bg-rose-700 focus:ring-2 focus:ring-rose-500/20"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20"
                }`}
              >
                {loading ? "Processing..." : confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
