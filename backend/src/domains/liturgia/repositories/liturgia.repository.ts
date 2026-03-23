import { prisma } from '@/infra/database/prisma';
import { ILiturgiaRepository } from '../interfaces/liturgia.repository.interface';

export class LiturgiaRepository implements ILiturgiaRepository {
  async findAll() {
    return prisma.liturgia.findMany();
  }

  async findByData(data: string) {
    return prisma.liturgia.findUnique({
      where: { data }
    });
  }

  async upsert(data: string, conteudo: string) {
    return prisma.liturgia.upsert({
      where: { data },
      update: { conteudo },
      create: { data, conteudo }
    });
  }
}