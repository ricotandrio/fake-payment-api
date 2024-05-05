import { Log } from "./log";

export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
  TRANSFER = "transfer",
  QRIS = "qris",
}

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export interface Transaction extends Log {
  transaction_id: string;
  transaction_type: TransactionType;
  transaction_date: Date;
  transaction_amount: number;
  transaction_status: TransactionStatus;
  transaction_note?: string;
  user_id: string;
  account_id: string;
  client_id: string;
}