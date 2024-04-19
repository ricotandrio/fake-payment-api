import { NextFunction, Request, Response } from "express";

export class QrCodeController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch(e) {
      next(e);
    }
  }
}