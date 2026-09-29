/**
 * Export array of data to CSV file and trigger browser download
 * @param {Array<Object>} data - Array of data records
 * @param {string} filename - Desired output filename (e.g. 'students_list.csv')
 * @param {Array<{label: string, key: string|Function}>} columns - Column mapping
 */
export const exportToCSV = (data, filename, columns) => {
  if (!data || !data.length) {
    alert("No data available to export.");
    return;
  }

  // Header row
  const headers = columns.map((col) => `"${col.label.replace(/"/g, '""')}"`);

  // Data rows
  const rows = data.map((item) =>
    columns
      .map((col) => {
        let value = "";
        if (typeof col.key === "function") {
          value = col.key(item);
        } else {
          value = item[col.key] !== undefined && item[col.key] !== null ? item[col.key] : "";
        }

        const stringValue = String(value).replace(/"/g, '""');
        return `"${stringValue}"`;
      })
      .join(",")
  );

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
