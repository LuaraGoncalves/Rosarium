import { z } from 'zod'

export type CreateSantoDTO = z.infer<typeof createSantoSchema>

export const createSantoSchema = z.object({
  nome: z.string().min(3, 'Nome muito curto'),
  descricao: z.string().min(10),
  imagem: z.string().url().optional(),
})