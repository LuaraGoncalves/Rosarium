import express from 'express';
import cors from 'cors';
import routes from '@/infra/http/routes';
import { errorHandler } from '@/shared/middlewares/errorHandler';
import { requestLogger } from '@/shared/middlewares/requestLogger';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { setupCronJobs } from './config/cron';

const app = express();
const allowedOrigins = new Set(
  [
    env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ].filter(Boolean)
);

if (process.env.NODE_ENV !== 'test') {
  setupCronJobs();
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      try {
        const url = new URL(origin);
        const isVercelPreview = url.hostname.endsWith('.vercel.app');
        if (allowedOrigins.has(origin) || isVercelPreview) {
          callback(null, true);
          return;
        }
      } catch {
        // ignore invalid origin strings
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(requestLogger);
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { app };
