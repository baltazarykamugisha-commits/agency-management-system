import axios from 'axios';

const api = axios.create({
  // Local development uses Vite's /api proxy. The public deployment supplies
  // its backend URL through VITE_API_BASE_URL.
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

export default api;
