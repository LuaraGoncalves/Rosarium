import axios from 'axios';

const isProd = import.meta.env.PROD;
const defaultApiUrl = isProd
  ? 'https://rosarium-6x3i.onrender.com/api'
  : 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : defaultApiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
