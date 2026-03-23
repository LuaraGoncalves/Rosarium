import { prisma } from '@/infra/database/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterDTO, LoginDTO } from './auth.dto';
import { AppError } from '../../shared/errors/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'rosarium-super-secret-key-12345';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class AuthService {
  async register(data: RegisterDTO) {
    const { name, email, password } = data;

    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      throw new AppError('Este e-mail já está em uso.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }
}
