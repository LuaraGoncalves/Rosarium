import { prisma } from '@/infra/database/prisma';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { RegisterDTO, LoginDTO } from './auth.dto';
import { AppError } from '../../shared/errors/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'rosarium-super-secret-key-12345';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const COOKIE_NAME = 'rosarium_auth';

function parseExpiresInToMs(expiresIn: string) {
  const match = /^(\d+)([smhd])$/.exec(expiresIn.trim());

  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const value = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
}

export class AuthService {
  private sanitizeUser(user: {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public getCookieName() {
    return COOKIE_NAME;
  }

  public getCookieOptions() {
    const isProd = process.env.NODE_ENV === 'production';

    return {
      httpOnly: true,
      secure: isProd,
      sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
      path: '/',
      maxAge: parseExpiresInToMs(JWT_EXPIRES_IN),
    };
  }

  public getClearCookieOptions() {
    const isProd = process.env.NODE_ENV === 'production';

    return {
      httpOnly: true,
      secure: isProd,
      sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
      path: '/',
    };
  }

  public createAuthToken(userId: string) {
    return jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
    });
  }

  async register(data: RegisterDTO) {
    const { name, email, password } = data;

    const userExists = await prisma.user.findUnique({
      where: { email },
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
      },
    });

    return {
      user: this.sanitizeUser(user),
      token: this.createAuthToken(user.id),
    };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    return {
      user: this.sanitizeUser(user),
      token: this.createAuthToken(user.id),
    };
  }

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    return this.sanitizeUser(user);
  }
}
