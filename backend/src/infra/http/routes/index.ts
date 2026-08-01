import { Router } from 'express';
import santosRoutes from '@/infra/http/routes/santos.routes';
import liturgiaRoutes from '@/infra/http/routes/liturgia.routes';
import authRoutes from '@/infra/http/routes/auth.routes';
import { novenasRoutes } from '@/infra/http/routes/novenas.routes';
import healthRoutes from '@/infra/http/routes/health.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/santos', santosRoutes);
router.use('/liturgia', liturgiaRoutes);
router.use('/auth', authRoutes);
router.use('/novenas', novenasRoutes);

export default router;
