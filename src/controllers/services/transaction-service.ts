import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequest } from "../../models/requests/transaction-request";
import { CreateTransactionFailedResponse, CreateTransactionSuccessResponse } from "../../models/responses/transaction-response";
import { TokenValidator } from "../helpers/validate-token";
import { v4 as uuidv4 } from 'uuid';

export const CreateTransactionHelpers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const request: CreateTransactionRequest = req.body as CreateTransactionRequest;

    if (!request.payment_type || !request.transaction_detail || !request.customer_detail || !request.token) {
      return res.status(400).json({
        code: res.statusCode,
        message: 'Bad Request'
      } as CreateTransactionFailedResponse);
    }

    const merchant = TokenValidator(request.token);
    if(!merchant) {
      return res.status(401).json({
        code: res.statusCode,
        message: 'Unauthorized'
      } as CreateTransactionFailedResponse);
    }

    const transaction_id = uuidv4();
    res.status(201).json({
      code: res.statusCode,
      message: 'Created',
      transaction: {
        transaction_id: transaction_id,
        merchant_id: merchant.merchant_id,
        currency_symbol: merchant.currency_symbol,
        customer_id: request.customer_detail.customer_id,
        transaction_status: 'pending',
        transaction_amount: parseFloat(request.transaction_detail.amount),
        transaction_date: new Date(),
        transaction_updated: new Date(),
        payment_method: request.payment_type
      },
      actions: {
        name: 'Get Transaction Status',
        method: 'GET',
        url: `/api/transaction/${transaction_id}`
      }
    } as CreateTransactionSuccessResponse);

  } catch(e) {
    next(e);
  }
}