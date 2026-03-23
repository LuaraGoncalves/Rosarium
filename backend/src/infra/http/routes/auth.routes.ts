import { Router } from 'express';
import { AuthController } from '@/domains/auth/controllers/auth.controller';
import { validate } from '@/shared/middlewares/validate';
import { registerSchema, loginSchema } from '@/domains/auth/auth.dto';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);

export default authRoutes;
