import { prisma } from '@/infra/database/prisma';
import type { CuriosidadeInput } from './curiosidades.schema';

export class CuriosidadeService {
  static listPublicas(search?: string) {
    return prisma.curiosidade.findMany({
      where: {
        publicado: true,
        ...(search
          ? {
              OR: [
                { titulo: { contains: search, mode: 'insensitive' } },
                { conteudo: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: { santo: { select: { id: true, nome: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  static listTodas() {
    return prisma.curiosidade.findMany({
      include: { santo: { select: { id: true, nome: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  static create(data: CuriosidadeInput) {
    return prisma.curiosidade.create({ data });
  }
  static update(id: number, data: CuriosidadeInput) {
    return prisma.curiosidade.update({ where: { id }, data });
  }
  static remove(id: number) {
    return prisma.curiosidade.delete({ where: { id } });
  }
}
