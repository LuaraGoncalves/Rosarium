import { Router } from 'express';
import {
  getLiturgias,
  getLiturgiaByData,
  createOrUpdateLiturgia,
  getLiturgiaDiaria,
} from '@/domains/liturgia/liturgia.controller';
import { authMiddleware } from '@/shared/middlewares/auth.middleware';
import { adminMiddleware } from '@/shared/middlewares/admin.middleware';

const router = Router();

router.get('/hoje', getLiturgiaDiaria);
router.get('/', getLiturgias);
router.get('/:data', getLiturgiaByData);
router.post('/', authMiddleware, adminMiddleware, createOrUpdateLiturgia);

export default router;
