import { Router } from 'express'
import santosRoutes from '@/infra/http/routes//santos.routes'
import liturgiaRoutes from '@/infra/http/routes/liturgia.routes'
import authRoutes from '@/infra/http/routes/auth.routes'
import { novenasRoutes } from '@/infra/http/routes/novenas.routes'

const router = Router()

router.use('/santos', santosRoutes)
router.use('/liturgia', liturgiaRoutes)
router.use('/auth', authRoutes)
router.use('/novenas', novenasRoutes)

export default router
