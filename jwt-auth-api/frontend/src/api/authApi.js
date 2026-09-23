// Helper functions for Cookie management
export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

export const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

// Decode JWT token payload without external dependencies
export const parseJwt = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

// API Base URL (Relative for Vite proxy or direct)
const API_BASE = '/api/auth';

/**
 * Universal API Request Maker
 * @param {string} endpoint - e.g. '/profile', '/dashboard', '/courses', '/admin'
 * @param {object} options - fetch options
 * @param {string} transportMode - 'cookie' | 'header' | 'both' | 'none'
 * @param {string} token - JWT token string
 */
export const makeApiRequest = async (
  endpoint,
  options = {},
  transportMode = 'both',
  token = ''
) => {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Determine headers based on transportMode
  if ((transportMode === 'header' || transportMode === 'both') && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const startTime = performance.now();

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include' // Sends cookies cross-origin / same-origin
    });

    const latency = Math.round(performance.now() - startTime);
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: res.statusText || 'Non-JSON response' };
    }

    return {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      latency,
      data,
      sentHeaders: headers,
      transportMode
    };
  } catch (err) {
    const latency = Math.round(performance.now() - startTime);
    return {
      ok: false,
      status: 0,
      statusText: 'Network Error',
      latency,
      data: { message: err.message || 'Network error connecting to API' },
      sentHeaders: headers,
      transportMode
    };
  }
};
