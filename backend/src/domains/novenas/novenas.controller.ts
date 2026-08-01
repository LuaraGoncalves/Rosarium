import { NextFunction, Request, Response } from 'express';
import { prisma } from '@/infra/database/prisma';
import { AppError } from '@/shared/errors/AppError';
import { z } from 'zod';

interface INovenaProgress {
  id: string;
  userId: string;
  novenaId: string;
  completedDays: number[];
  updatedAt: Date;
  createdAt: Date;
}

interface PrismaWithNovena {
  novenaProgress: {
    findUnique: (args: {
      where: {
        userId_novenaId: {
          userId: string;
          novenaId: string;
        };
      };
    }) => Promise<INovenaProgress | null>;
    upsert: (args: {
      where: {
        userId_novenaId: {
          userId: string;
          novenaId: string;
        };
      };
      update: {
        completedDays: number[];
      };
      create: {
        userId: string;
        novenaId: string;
        completedDays: number[];
      };
    }) => Promise<INovenaProgress>;
  };
}

const db = prisma as unknown as PrismaWithNovena;

const normalizeParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export class NovenasController {
  async getProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const novenaId = normalizeParam(req.params.novenaId);
      if (!novenaId) {
        throw new AppError('novenaId é obrigatório.', 400);
      }

      const userId = (req as Request & { user?: { id: string } }).user?.id;

      if (!userId) {
        throw new AppError('Não autorizado.', 401);
      }

      const progress = await db.novenaProgress.findUnique({
        where: {
          userId_novenaId: {
            userId,
            novenaId,
          },
        },
      });

      return res.json({
        completedDays: progress?.completedDays || [],
        updatedAt: progress?.updatedAt ? progress.updatedAt.toISOString() : null,
      });
    } catch (error) {
      return next(error);
    }
  }

  async saveProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const novenaId = normalizeParam(req.params.novenaId);
      if (!novenaId) {
        throw new AppError('novenaId é obrigatório.', 400);
      }
      const userId = (req as Request & { user?: { id: string } }).user?.id;

      if (!userId) {
        throw new AppError('Não autorizado.', 401);
      }

      const bodySchema = z.object({
        completedDays: z.array(z.number()),
        localUpdatedAt: z.string().datetime().optional(),
      });

      const { completedDays, localUpdatedAt } = bodySchema.parse(req.body);

      const currentProgress = await db.novenaProgress.findUnique({
        where: {
          userId_novenaId: { userId, novenaId },
        },
      });

      if (currentProgress && localUpdatedAt) {
        const clientDate = new Date(localUpdatedAt);
        const serverDate = new Date(currentProgress.updatedAt);

        if (serverDate.getTime() > clientDate.getTime() + 1000) {
          throw new AppError('Conflict: Server has newer data', 409, {
            completedDays: currentProgress.completedDays,
            updatedAt: currentProgress.updatedAt.toISOString(),
          });
        }
      }

      const progress = await db.novenaProgress.upsert({
        where: {
          userId_novenaId: {
            userId,
            novenaId,
          },
        },
        update: {
          completedDays,
        },
        create: {
          userId,
          novenaId,
          completedDays,
        },
      });

      return res.json({
        completedDays: progress.completedDays,
        updatedAt: progress.updatedAt.toISOString(),
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return next(new AppError('Erro de validação', 400, error.format()));
      }
      return next(error);
    }
  }
}
