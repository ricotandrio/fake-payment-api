import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/error/response.error";
import { TokenService } from "../services/token.service";


export const cookiesMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.cookies;

    if(!authorization) {
      throw new ResponseError(401, "Unauthorized: Authorization Headers not found");
    }

    const client_id = TokenService.verify(authorization.token);

    if(!client_id) {
      throw new ResponseError(401, "Unauthorized: Invalid Token");
    }

    next();
  } catch(e) {
    next(e);
  }
}