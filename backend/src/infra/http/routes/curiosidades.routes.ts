import { Router } from 'express';
import { createCuriosidade, deleteCuriosidade, listCuriosidades, listCuriosidadesAdmin, updateCuriosidade } from '@/domains/curiosidades/curiosidades.controller';
import { curiosidadeSchema } from '@/domains/curiosidades/curiosidades.schema';
import { authMiddleware } from '@/shared/middlewares/auth.middleware';
import { adminMiddleware } from '@/shared/middlewares/admin.middleware';
import { validate } from '@/shared/middlewares/validate';

const router = Router();
router.get('/', listCuriosidades);
router.get('/admin', authMiddleware, adminMiddleware, listCuriosidadesAdmin);
router.post('/', authMiddleware, adminMiddleware, validate(curiosidadeSchema), createCuriosidade);
router.put('/:id', authMiddleware, adminMiddleware, validate(curiosidadeSchema), updateCuriosidade);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCuriosidade);
export default router;
