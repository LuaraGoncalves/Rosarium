import { Request, Response } from 'express';
import { prisma } from '@/infra/database/prisma';
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
    findUnique: (args: any) => Promise<INovenaProgress | null>;
    upsert: (args: any) => Promise<INovenaProgress>;
  };
}

const db = prisma as unknown as PrismaWithNovena;

export class NovenasController {
  async getProgress(req: Request, res: Response) {
    try {
      const { novenaId } = req.params;
      
      const userId = (req as Request & { user?: { id: string } }).user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
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
        updatedAt: progress?.updatedAt ? progress.updatedAt.toISOString() : null
      });
    } catch (error) {
      console.error('Error fetching novena progress:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async saveProgress(req: Request, res: Response) {
    try {
      const { novenaId } = req.params;
      const userId = (req as Request & { user?: { id: string } }).user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
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
          return res.status(409).json({
            error: 'Conflict: Server has newer data',
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
        updatedAt: progress.updatedAt.toISOString()
      });
    } catch (error: any) {
      console.error('Error saving novena progress:', error);
     if (error instanceof z.ZodError) {
  return res.status(400).json({
    error: error.issues.map(e => ({
      campo: e.path.join('.'),
      mensagem: e.message
    }))
  });
}
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}