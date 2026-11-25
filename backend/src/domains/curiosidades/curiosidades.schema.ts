import { z } from 'zod';

export const curiosidadeSchema = z.object({
  titulo: z.string().min(3).max(160),
  conteudo: z.string().min(10),
  fonte: z.string().min(2).max(120),
  fonteUrl: z.string().url(),
  imagemUrl: z.string().url().optional().or(z.literal('')),
  santoId: z.number().int().positive().optional().nullable(),
  publicado: z.boolean().optional(),
});

export type CuriosidadeInput = z.infer<typeof curiosidadeSchema>;
