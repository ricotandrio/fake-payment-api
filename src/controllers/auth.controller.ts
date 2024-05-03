import { GetTokenRequest } from "../models/requests/token.request";
import { GetTokenSuccessResponse } from "../models/responses/token.response";
import { AuthService } from "../services/auth.service";
import { NextFunction, Request, Response } from "express";

export class AuthController {

  static async generateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const request: GetTokenRequest = req.body as GetTokenRequest;

      const response = await AuthService.generateToken(request.user_id, request.client_secret);
      
      res.status(200).json({
        code: 200,
        message: "Token generated successfully",
        data: response
      } as GetTokenSuccessResponse);
      
    } catch(e) {
      next(e);
    }
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.validateToken(req.params.token);
      
      res.status(200).json({
        code: 200,
        message: "Token is valid",
        data: response
      } as GetTokenSuccessResponse);
      
    } catch(e) {
      next(e);
    }
  }
  
}