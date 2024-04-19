import { CreateTransactionRequest } from "../models/requests/transaction-request";
import { CreateTransactionSuccessResponse } from "../models/responses/transaction-response";
import { ResponseError } from "../utils/error/response.error";
import { validateCreateTransaction } from "../utils/validation/transaction.validation";
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from "./token-service";

export class TransactionService {
    
  static async create(request: CreateTransactionRequest): Promise<CreateTransactionSuccessResponse> {
    if(validateCreateTransaction(request).success === false) {
      throw new ResponseError(400, 'Bad Request, Invalid Data');
    }

    const merchant = await TokenService.validateToken(request.token);
    if(!merchant) {
      throw new ResponseError(401, 'Unauthorized');
    }

    const transaction_id = uuidv4();
    return {
      code: 201,
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
    } as CreateTransactionSuccessResponse;

  }
}