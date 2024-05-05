import { TransactionStatus, TransactionType } from "../database/transaction";
import { BaseResponse } from "./base.response";

export interface TransactionDTO {
  transaction_id: string;
  transaction_type: TransactionType;
  transaction_date: Date;
  transaction_amount: number;
  transaction_status: TransactionStatus;
  transaction_note?: string;
  payment_url?: string;
  user_id: string;
  merchant: {
    merchant_id: string;
    merchant_name: string;
    merchant_email: string;
    merchant_phone: string;
    merchant_address: string;
    merchant_website: string;
  };
}

export interface CreateTransactionSuccessResponse extends BaseResponse {
  data: TransactionDTO;
}

export interface CreateTransactionFailedResponse extends BaseResponse {}

export interface UpdateTransactionSuccessResponse extends BaseResponse {
  data: TransactionDTO;
}

export interface UpdateTransactionFailedResponse extends BaseResponse {}

