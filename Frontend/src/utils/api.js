/**
 * Shared API utility for the portfolio frontend.
 * Reads the backend URL from VITE_API_URL env var.
 * Falls back to the live Render URL so it works even without a .env file.
 *
 * Usage:
 *   import { apiFetch } from '../utils/api';
 *   const data = await apiFetch('/services');
 */

const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  'https://bereket-fikre-backend.onrender.com/api';

/**
 * Fetch from the backend API.
 * Returns parsed JSON data array/object, or throws on error.
 * @param {string} path  - e.g. '/faqs?limit=50'
 * @returns {Promise<any>}
 */
export const apiFetch = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  const json = await res.json();
  // Backend wraps all responses in { success, data, pagination }
  return json.data;
};

export default apiFetch;
