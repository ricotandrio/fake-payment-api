import { NextFunction, Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../models/requests/transaction.request";
import { CreateTransactionSuccessResponse, UpdateTransactionSuccessResponse } from "../models/responses/transaction.response";

export class TransactionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {

      const request: CreateTransactionRequest = req.body as CreateTransactionRequest;
      const client = res.locals.authorization;

      const response = await TransactionService.create(request, client);

      res.status(201).json({
        code: 201,
        message: `Success: Transaction created successfully at ${response.transaction_date}`,
        data: response
      } as CreateTransactionSuccessResponse);

    } catch(e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateTransactionRequest = req.body as UpdateTransactionRequest;

      const response = await TransactionService.update(request);
      res.status(200).json({
        code: 200,
        message: `Success: Transaction updated successfully at ${response.transaction_date}`,
        data: response
      } as UpdateTransactionSuccessResponse);

    } catch(e) {
      next(e);
    }
  }
}