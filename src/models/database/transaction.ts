import { Log } from "./log";

export interface Transaction extends Log {
  transaction_id: string;
  transaction_type: "credit" | "debit" | "transfer" | "qris";
  transaction_date: Date;
  transaction_amount: number;
  transaction_status: "pending" | "success" | "failed";
  transaction_note: string;
  transaction_from: string;
  user_id: string;
}