import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/error/response.error";
import { TokenService } from "../services/token.service";
import { BaseResponse } from "../models/responses/base.response";

export class TokenController {

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers['authorization'];

      if(!authorization || !authorization.startsWith("Basic ")) {
        throw new ResponseError(401, "Unauthorized: Client_ID and Client_Secret is required");
      }

      const response = await TokenService.get(authorization);

      res.status(200).json({ 
        code: 200,
        message: "Success: Token is generated",
        token: response
      } as BaseResponse);
      
    } catch(e) {
      next(e);
    }
  }
}