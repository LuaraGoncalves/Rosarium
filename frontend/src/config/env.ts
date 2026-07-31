import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
});

export const env = envSchema.parse(import.meta.env);

export const apiBaseUrl = (() => {
  const baseUrl =
    env.VITE_API_URL ??
    (import.meta.env.PROD ? 'https://rosarium-6x3i.onrender.com' : 'http://localhost:3001');

  return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
})();
