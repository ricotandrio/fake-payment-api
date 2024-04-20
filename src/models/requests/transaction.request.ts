export interface CreateTransactionRequest {
  payment_type: string;
  transaction_detail: {
    order_id: string;
    amount: string;
  };
  customer_detail: {
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
  };
  token: string;
}

