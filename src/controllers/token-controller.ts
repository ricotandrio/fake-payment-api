import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token-service';

export class TokenController {

  static async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await TokenService.generateToken();
      res.status(200).json({ token });
    } catch(e) {
      next(e);
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch(e) {
      next(e);
    }
  }
}