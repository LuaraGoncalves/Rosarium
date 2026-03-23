import { Router } from 'express';
import { getLiturgias, getLiturgiaByData, createOrUpdateLiturgia, getLiturgiaDiaria } from '@/domains/liturgia/liturgia.controller';

const router = Router();

router.get('/hoje', getLiturgiaDiaria);
router.get('/', getLiturgias);
router.get('/:data', getLiturgiaByData);
router.post('/', createOrUpdateLiturgia);

export default router;
