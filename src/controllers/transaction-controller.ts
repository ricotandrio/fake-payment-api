import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequest } from "../models/requests/transaction-request";
import { CreateTransactionFailedResponse, CreateTransactionSuccessResponse } from "../models/responses/transaction-response";
import { v4 as uuidv4 } from 'uuid';
import { validateCreateTransaction } from "../utils/validation/transaction.validation";
import { TransactionService } from "../services/transaction-service";

export class TransactionController {

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as CreateTransactionRequest;

      const transaction = await TransactionService.create(request);

      res.status(201).json(transaction);

    } catch(e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {

    } catch(e) {
      next(e);
    }
  }
  
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {

    } catch(e) {
      next(e);
    }
  }
}