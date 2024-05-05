import { NextFunction, Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { CreateTransactionRequest } from "../models/requests/transaction.request";
import { ResponseError } from "../utils/error/response.error";
import { CreateTransactionSuccessResponse } from "../models/responses/transaction.response";

export class TransactionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.cookies;
      const request: CreateTransactionRequest = req.body as CreateTransactionRequest;

      if(!authorization) {
        throw new ResponseError(401, "Unauthorized: Authorization Headers not found");
      }

      const response = await TransactionService.create(request, authorization.token);
      res.status(201).json({
        code: 201,
        message: `Transaction created successfully at ${response.transaction_date}`,
        data: response
      } as CreateTransactionSuccessResponse);

    } catch(e) {
      next(e);
    }
  }
}