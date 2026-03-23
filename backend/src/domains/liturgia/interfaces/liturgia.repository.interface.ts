import { Liturgia } from '@prisma/client';

export interface ILiturgiaRepository {
  findAll(): Promise<Liturgia[]>;
  findByData(data: string): Promise<Liturgia | null>;
  upsert(data: string, conteudo: string): Promise<Liturgia>;
}