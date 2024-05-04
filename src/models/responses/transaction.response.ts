import { TransactionStatus, TransactionType } from "../database/transaction";
import { BaseResponse } from "./base.response";

export interface TransactionSuccessDataResponse {
  transaction_id: string;
  transaction_type: TransactionType;
  transaction_date: Date;
  transaction_amount: number;
  transaction_status: TransactionStatus;
  transaction_note?: string;
  transaction_currency: string;
  payment_url?: string;
  user: {
    user_id: string;
    user_email: string;
    user_name: string;
  };
  merchant: {
    merchant_id: string;
    merchant_name: string;
    merchant_email: string;
    merchant_phone: string;
    merchant_address: string;
    merchant_website: string;
    redirect_uri: string;
  };
}

export interface TransactionSuccessResponse extends BaseResponse {
  data: TransactionSuccessDataResponse;
}


export interface TransactionErrorResponse extends BaseResponse {}

export interface TransactionUpdateSuccessResponse extends BaseResponse {
  data: TransactionSuccessDataResponse;
}

export interface TransactionUpdateErrorResponse extends BaseResponse {}