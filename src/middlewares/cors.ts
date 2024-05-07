import { NextFunction, Request, Response } from "express";
import { logger } from "../app/logging";

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[Middleware] CORS... [${req.url}] [${req.method}] [${req.ip}]`);
  
  try {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
    next();
  } catch(e) {
    next(e);
  }
}
