import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../utils/error/response.error";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      code: 400,
      message: `Validation Error : ${JSON.stringify(error)}`
    });
  } else if (error instanceof ResponseError) {
    res.status(error.code).json({
      code: error.code,
      message: error.message
    });
  } else {
    res.status(500).json({
      code: 500,
      message: error.message
    }); 
  }
}

