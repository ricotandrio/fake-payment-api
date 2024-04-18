export type Transaction = {
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  amount: string;
  currency_symbol: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: "pending" | "completed" | "expired";
};