import { Merchant } from "@prisma/client";
import { Transaction, TransactionStatus, TransactionType } from "../database/transaction";
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

export const toTransactionDTO = (transaction: Transaction, merchant: Merchant): TransactionDTO => {
  return {
    transaction_id: transaction.transaction_id,
    transaction_type: transaction.transaction_type as TransactionType,
    transaction_date: transaction.transaction_date,
    transaction_amount: transaction.transaction_amount,
    transaction_status: transaction.transaction_status as TransactionStatus,
    transaction_note: transaction.transaction_note || "",
    payment_url: `${merchant.redirect_url}/${transaction.transaction_id}`,
    user_id: transaction.user_id,
    merchant: {
      merchant_id: merchant.merchant_id,
      merchant_name: merchant.merchant_name,
      merchant_email: merchant.merchant_email,
      merchant_phone: merchant.merchant_phone,
      merchant_address: merchant.merchant_address,
      merchant_website: merchant.merchant_website,
    }
  };
}