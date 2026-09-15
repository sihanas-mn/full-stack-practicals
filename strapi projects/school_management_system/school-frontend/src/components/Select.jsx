import React from "react";
import { ChevronDown, X } from "lucide-react";

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option...",
  required = false,
  error = null,
  disabled = false,
  isMulti = false,
  className = "",
}) {
  const selectId = id || name;

  if (isMulti) {
    const selectedValues = Array.isArray(value) ? value : [];

    const toggleOption = (val) => {
      let updated;
      if (selectedValues.includes(val)) {
        updated = selectedValues.filter((v) => v !== val);
      } else {
        updated = [...selectedValues, val];
      }
      onChange({ target: { name, value: updated } });
    };

    const removeOption = (val, e) => {
      e.stopPropagation();
      const updated = selectedValues.filter((v) => v !== val);
      onChange({ target: { name, value: updated } });
    };

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1">
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        )}

        <div className="border border-slate-300 rounded-lg p-2 bg-white min-h-[42px] flex flex-wrap gap-1.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
          {selectedValues.length === 0 ? (
            <span className="text-sm text-slate-400 self-center pl-1">{placeholder}</span>
          ) : (
            selectedValues.map((val) => {
              const opt = options.find((o) => String(o.value) === String(val));
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {opt ? opt.label : val}
                  <button
                    type="button"
                    onClick={(e) => removeOption(val, e)}
                    className="hover:text-blue-900 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>

        {/* Options list as checkboxes for clean, effortless multi-selection */}
        <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg divide-y divide-slate-100 bg-slate-50 p-1 mt-1">
          {options.length === 0 ? (
            <p className="text-xs text-slate-400 py-2 px-3 text-center">No options available</p>
          ) : (
            options.map((opt) => {
              const isChecked = selectedValues.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded cursor-pointer transition-colors ${
                    isChecked ? "bg-blue-100/60 text-blue-900 font-medium" : "hover:bg-white text-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleOption(opt.value)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div className="flex flex-col">
                    <span>{opt.label}</span>
                    {opt.sublabel && (
                      <span className="text-xs text-slate-400">{opt.sublabel}</span>
                    )}
                  </div>
                </label>
              );
            })
          )}
        </div>

        {error && <p className="text-xs text-rose-600 mt-0.5">{error}</p>}
      </div>
    );
  }

  // Single select
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1"
        >
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`appearance-none block w-full rounded-lg border text-sm pr-10 pl-3.5 py-2.5 transition-all
            ${
              error
                ? "border-rose-300 text-rose-900 bg-rose-50/20 focus:ring-2 focus:ring-rose-500"
                : "border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} {opt.sublabel ? `(${opt.sublabel})` : ""}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && <p className="text-xs text-rose-600 mt-0.5">{error}</p>}
    </div>
  );
}
