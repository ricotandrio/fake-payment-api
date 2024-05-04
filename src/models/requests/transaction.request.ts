import { TransactionType } from "../database/transaction";

export interface CreateTransactionRequest {
  transaction_type: TransactionType;
  transaction_date: Date;
  transaction_amount: number;
  transaction_note?: string;
  transaction_currency: string;
  user: {
    user_id: string;
    user_email: string;
    user_name: string;
  };
  merchant_id: string;
  token: string;
}

export interface UpdateTransactionRequest {
  transaction_id: string;
  status: string;
}