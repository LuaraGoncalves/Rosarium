import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'rosarium-super-secret-key-12345';
const AUTH_COOKIE_NAME = 'rosarium_auth';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
  };
};

function getCookieValue(cookieHeader: string | undefined, cookieName: string) {
  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader.split(';').map((part) => part.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));

  if (!match) {
    return undefined;
  }

  return decodeURIComponent(match.slice(cookieName.length + 1));
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const cookieToken = getCookieValue(req.headers.cookie, AUTH_COOKIE_NAME);

  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  const token = bearerToken || cookieToken;

  if (!token) {
    throw new AppError('Token JWT não fornecido.', 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    (req as AuthenticatedRequest).user = {
      id: decoded.id,
    };

    return next();
  } catch {
    throw new AppError('Token JWT inválido.', 401);
  }
}
