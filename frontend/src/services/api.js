import axios from 'axios';

// Vite replaces VITE_* values during `npm run build`, so this must be set in
// the Render Static Site environment before each deploy.  Accept the shorter
// name too, to avoid silently falling back to the frontend origin.
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

const api = axios.create({
  // Local development uses Vite's /api proxy. The public deployment supplies
  // its backend URL through VITE_API_BASE_URL (or VITE_API_URL).
  baseURL: apiBaseUrl ? apiBaseUrl.replace(/\/$/, '') : '/api',
});

export default api;
