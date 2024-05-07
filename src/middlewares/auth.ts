  import { NextFunction, Request, Response } from "express"
  import { prismaClient } from "../app/database";
  import { JWT_SECRET } from "../app/web";
  import jwt from "jsonwebtoken";
  import { toAuthDTO } from "../models/responses/auth.response";
  import { BaseResponse } from "../models/responses/base.response";
  import { logger } from "../app/logging";

  export const authMiddleware = async (req: Request, res:Response, next: NextFunction) => {
    logger.info(`[Middleware] Authenticating... [${req.url}] [${req.method}] [${req.ip}]`);
    
    const { authorization } = req.headers;

    if(!authorization) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized: Token is required"
      } as BaseResponse).end();
    }

    const token = authorization!.replace("Bearer ", "");

    if(!token) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized: Format token is Invalid"
      } as BaseResponse).end();
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET!) as { client_id: string, exp: number };
    } catch (error) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized: Invalid token, can't be decoded"
      } as BaseResponse);
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if(decoded.exp < currentTime) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized: Token is expired"
      } as BaseResponse).end();
    }

    const auth = await prismaClient.auth.findFirst({
      where: {
        client_id: decoded.client_id
      }
    });

    if(!auth) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized: Client is not found"
      } as BaseResponse).end();
    }
    
    res.locals.authorization = toAuthDTO(auth!);

    next();
  }