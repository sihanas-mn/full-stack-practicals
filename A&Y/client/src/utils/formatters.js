/**
 * Format Sri Lankan Rupees with proper grouping
 * @param {number} amount
 * @param {boolean} abbreviated - Show abbreviated (e.g., 49.88M)
 * @returns {string}
 */
export const formatLKR = (amount, abbreviated = false) => {
  if (amount === null || amount === undefined) return '—';
  
  const num = Number(amount);
  if (isNaN(num)) return String(amount);

  if (abbreviated) {
    if (num >= 1000000000) return `LKR ${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `LKR ${(num / 1000000).toFixed(2)}M`;
    if (num >= 100000) return `LKR ${(num / 100000).toFixed(2)}L`;
    if (num >= 1000) return `LKR ${(num / 1000).toFixed(1)}K`;
  }

  return `LKR ${num.toLocaleString('en-LK', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

/**
 * Format full accessible currency value
 */
export const formatLKRFull = (amount) => {
  if (!amount) return '—';
  return `Sri Lankan Rupees ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
};

/**
 * Format percentage
 */
export const formatPercent = (value) => {
  if (value === null || value === undefined) return '—';
  return `${Number(value).toFixed(2)}%`;
};

/**
 * Format square feet
 */
export const formatSqFt = (value) => {
  if (!value) return '—';
  return `${Number(value).toLocaleString()} sq. ft.`;
};

/**
 * Format date
 */
export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Get status badge CSS class
 */
export const getStatusClass = (status) => {
  if (!status) return '';
  const map = {
    'Proposed': 'proposed',
    'Confirmed': 'confirmed',
    'Under construction': 'construction',
    'Complete': 'complete',
    'Coming soon': 'coming-soon',
    'Available': 'available',
    'On hold': 'on-hold',
    'Reserved': 'reserved',
    'Sold': 'sold',
    'Unavailable': 'sold',
    'New': 'new',
    'Contacted': 'proposed',
    'Qualified': 'confirmed',
    'Won': 'complete',
    'Lost': 'sold',
    'Not started': 'coming-soon',
    'In progress': 'construction',
    'Completed': 'complete',
    'Delayed': 'on-hold',
    'Draft': 'proposed',
    'Published': 'confirmed',
    'Archived': 'sold',
    'Low': 'confirmed',
    'Medium': 'proposed',
    'High': 'on-hold',
    'Critical': 'coming-soon',
    'Identified': 'proposed',
    'Monitored': 'construction',
    'Mitigated': 'confirmed',
    'Closed': 'complete',
  };
  return `badge--${map[status] || 'proposed'}`;
};
