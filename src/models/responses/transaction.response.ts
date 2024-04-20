import { Transaction } from "../database/transaction";
import { BaseResponse } from "./base.response";

export interface CreateTransactionSuccessResponse extends BaseResponse {
  transaction: Transaction;
  actions: {
    name: string;
    method: string;
    url: string;
  };
}

export interface TransactionStatusResponse extends BaseResponse {
  transaction: Transaction;
}

export interface CreateTransactionFailedResponse extends BaseResponse {}
