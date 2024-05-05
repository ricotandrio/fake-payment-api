import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/error/response.error";
import { TokenService } from "../services/token.service";
import { GetTokenRequest } from "../models/requests/token.request";
import { BaseResponse } from "../models/responses/base.response";

export class TokenController {

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers['authorization'];
      const request: GetTokenRequest = req.body as GetTokenRequest;

      if(!authorization || !authorization.startsWith("Basic ") || !request.user_id) {
        throw new ResponseError(401, "Unauthorized");
      }

      await TokenService.get(authorization, request.user_id, res);

      res.status(200).json({ 
        code: 200,
        message: "Success",
      } as BaseResponse);
      
    } catch(e) {
      next(e);
    }
  }
}