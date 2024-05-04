import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/error/response.error";
import { TokenService } from "../services/token.service";
import { GetTokenRequest } from "../models/requests/token.request";
import { GetTokenSuccessResponse, TokenVerifySuccessResponse } from "../models/responses/token.response";

export class TokenController {

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers['authorization'];
      const request: GetTokenRequest = req.body as GetTokenRequest;

      if(!authorization || !authorization.startsWith("Basic ") || !request.user_id) {
        throw new ResponseError(401, "Unauthorized");
      }

      const token = await TokenService.get(authorization, request.user_id);

      res.status(200).json({ 
        code: 200,
        message: "Success",
        token
      } as GetTokenSuccessResponse);
    } catch(e) {
      next(e);
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;
      const user_id = req.params.user_id;

      if(!token || !user_id) {
        throw new ResponseError(401, "Unauthorized");
      }
      
      const user = await TokenService.verify(token, user_id);

      res.status(200).json({ 
        code: 200,
        message: "Success",
        user_id: user
      } as TokenVerifySuccessResponse);
    } catch(e) {
      next(e);
    }
  }
}