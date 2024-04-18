export interface CreateTransactionRequest {
  payment_type: string;
  transaction_detail: {
    order_id: string;
    amount: string;
  };
  customer_detail: {
    name: string;
    email: string;
    phone: string;
  };
}

