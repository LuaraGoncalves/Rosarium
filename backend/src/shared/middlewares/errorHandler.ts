import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { logger } from '@/infra/logger/logger'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.errors && { errors: err.errors })
    });
  }

  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
  })

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
};
