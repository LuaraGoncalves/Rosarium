import { Router } from 'express';
import {
  getRosario,
  getRosarioMysteries,
  getRosarioMysteryBySlug,
  getRosarioMysteryToday,
  getRosarioPrayers,
} from '@/domains/rosario/rosario.controller';

const router = Router();

router.get('/', getRosario);
router.get('/oracoes', getRosarioPrayers);
router.get('/misterios', getRosarioMysteries);
router.get('/misterios/hoje', getRosarioMysteryToday);
router.get('/misterios/:slug', getRosarioMysteryBySlug);

export default router;
