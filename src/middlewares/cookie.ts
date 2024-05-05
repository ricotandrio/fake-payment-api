import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app/web";

export const cookieMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, JWT_SECRET!);
    
    next();
  } catch (error) {
    res.clearCookie("token");
  }
}