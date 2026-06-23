import { Router } from 'express';
import { AuthController } from '@/domains/auth/controllers/auth.controller';
import { validate } from '@/shared/middlewares/validate';
import { registerSchema, loginSchema } from '@/domains/auth/auth.dto';
import { authMiddleware } from '@/shared/middlewares/auth.middleware';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);
authRoutes.get('/me', authMiddleware, authController.me);
authRoutes.post('/logout', authController.logout);

export default authRoutes;
