export type Transaction = {
  transaction_id: string;
  merchant_id: string;
  currency_symbol: string;
  customer_id: string;

  transaction_status: "pending" | "completed" | "cancelled" | "failed";
  transaction_amount: number;
  transaction_date: Date;
  transaction_updated: Date;

  payment_method: string;
};