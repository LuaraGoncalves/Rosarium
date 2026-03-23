import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';
import { registerSchema, loginSchema } from '../auth.dto';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const data = registerSchema.parse(req.body);
      
      const result = await this.authService.register(data);
      
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginSchema.parse(req.body);

      const result = await this.authService.login(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
