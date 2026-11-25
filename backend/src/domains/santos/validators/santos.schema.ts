import { z } from 'zod';

export type CreateSantoDTO = z.infer<typeof createSantoSchema>;
export type UpdateSantoDTO = z.infer<typeof updateSantoSchema>;

export const createSantoSchema = z.object({
  nome: z.string().min(3, 'Nome muito curto'),
  historia: z.string().min(10, 'História muito curta'),
  diaFesta: z.string().optional(),
});

export const updateSantoSchema = createSantoSchema;
