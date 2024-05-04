import { NextFunction, Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../models/requests/transaction.request";
import { TransactionSuccessResponse, TransactionUpdateSuccessResponse } from "../models/responses/transaction.response";
import { TransactionStatus } from "../models/database/transaction";

export class TransactionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateTransactionRequest = req.body as CreateTransactionRequest;

      const response = await TransactionService.create(request);

      res.status(200).json({
        code: 200,
        message: "Transaction created successfully",
        data: response
      } as TransactionSuccessResponse);
      
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateTransactionRequest = req.body as UpdateTransactionRequest;

      const response = await TransactionService.update(request.transaction_id, request.status as TransactionStatus);

      res.status(200).json({
        code: 200,
        message: "Transaction updated successfully",
        data: response
      } as TransactionUpdateSuccessResponse);
    } catch (e) {
      next(e);
    }
  }
}