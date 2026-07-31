import axios from 'axios';
import { apiBaseUrl } from '@/config/env';

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
