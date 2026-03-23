import { prisma } from '../../../infra/database/prisma';
import { Result } from '../../../shared/types/Result';

export async function getSantoDoDia(): Promise<Result<any>> {
  try {
    const santoDoDia = await prisma.santoDoDia.findUnique({
      where: { id: 'santo-do-dia' }
    });

    if (!santoDoDia) {
      return { success: false, error: 'SANTO_DO_DIA_NOT_FOUND' };
    }

    return { success: true, data: santoDoDia };
  } catch (error) {
    console.error('[getSantoDoDia] Erro ao buscar no banco:', error);
    return { success: false, error: 'DATABASE_ERROR', details: error };
  }
}
