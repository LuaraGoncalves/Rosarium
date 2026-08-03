import { NextFunction, Request, Response } from 'express';
import { logger } from '@/infra/logger/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const payload = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      userAgent: req.get('user-agent'),
    };

    if (res.statusCode >= 500) {
      logger.error(payload, 'request completed');
      return;
    }

    if (res.statusCode >= 400) {
      logger.warn(payload, 'request completed');
      return;
    }

    logger.info(payload, 'request completed');
  });

  next();
};
