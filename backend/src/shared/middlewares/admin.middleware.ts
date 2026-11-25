import { NextFunction, Request, Response } from 'express';
import { env } from '@/config/env';
import { prisma } from '@/infra/database/prisma';
import { AppError } from '../errors/AppError';
import { AuthenticatedRequest } from './auth.middleware';

function getAllowedAdminEmails() {
  return env.ADMIN_EMAILS.split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function adminMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    const allowedAdminEmails = getAllowedAdminEmails();

    if (allowedAdminEmails.length === 0) {
      throw new AppError('Acesso administrativo não configurado.', 403);
    }

    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      throw new AppError('Usuário autenticado não encontrado.', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user || !allowedAdminEmails.includes(user.email.toLowerCase())) {
      throw new AppError('Acesso administrativo necessário.', 403);
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
