import axios from "axios";
const isProd = import.meta.env.PROD;
const defaultApiUrl = isProd 
  ? 'https://rosarium-6x3i.onrender.com/api' 
  : 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : defaultApiUrl,
  headers: {
    "Content-Type": "application/json",
  }
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@Rosarium:token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
