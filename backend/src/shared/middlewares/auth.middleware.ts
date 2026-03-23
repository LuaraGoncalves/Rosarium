import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'rosarium-super-secret-key-12345';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT não fornecido.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    (req as any).user = {
      id: decoded.id
    };

    return next();
  } catch (err) {
    throw new AppError('Token JWT inválido.', 401);
  }
}
