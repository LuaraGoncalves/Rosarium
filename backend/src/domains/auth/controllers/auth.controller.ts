import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';
import { registerSchema, loginSchema } from '../auth.dto';
import { AppError } from '../../../shared/errors/AppError';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  private setAuthCookie(res: Response, token: string) {
    res.cookie(this.authService.getCookieName(), token, this.authService.getCookieOptions());
  }

  private clearAuthCookie(res: Response) {
    res.clearCookie(this.authService.getCookieName(), this.authService.getClearCookieOptions());
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = registerSchema.parse(req.body);
      const result = await this.authService.register(data);

      this.setAuthCookie(res, result.token);
      res.status(201).json({ user: result.user });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginSchema.parse(req.body);

      const result = await this.authService.login(data);

      this.setAuthCookie(res, result.token);
      res.status(200).json({ user: result.user });
    } catch (error) {
      next(error);
    }
  };

  public me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;

      if (!userId) {
        throw new AppError('Não autorizado.', 401);
      }

      const user = await this.authService.me(userId);

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (_req: Request, res: Response) => {
    this.clearAuthCookie(res);
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
  };
}
