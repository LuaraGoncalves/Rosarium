import { Router } from 'express';
import { NovenasController } from '@/domains/novenas/novenas.controller';
import { authMiddleware } from '@/shared/middlewares/auth.middleware';

const router = Router();
const novenasController = new NovenasController();

router.use(authMiddleware);

router.get('/progress/:novenaId', novenasController.getProgress);
router.post('/progress/:novenaId', novenasController.saveProgress);

export { router as novenasRoutes };