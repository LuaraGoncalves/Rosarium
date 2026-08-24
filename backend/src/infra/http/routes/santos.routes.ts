import { Router } from 'express';
import {
  createSanto,
  getSantoById,
  getSantoDoDia,
  getSantosByDiaFesta,
  listSantos,
  updateSanto,
} from '@/domains/santos/santos.controller';
import { authMiddleware } from '@/shared/middlewares/auth.middleware';
import { adminMiddleware } from '@/shared/middlewares/admin.middleware';
import { validate } from '@/shared/middlewares/validate';
import { createSantoSchema, updateSantoSchema } from '@/domains/santos/validators/santos.schema';

const router = Router();

router.post('/', authMiddleware, adminMiddleware, validate(createSantoSchema), createSanto);
router.get('/', listSantos);
router.get('/hoje', getSantoDoDia);
router.get('/dia/:diaFesta', getSantosByDiaFesta);
router.get('/:id', getSantoById);
router.put('/:id', authMiddleware, adminMiddleware, validate(updateSantoSchema), updateSanto);

export default router;
