import { z } from 'zod';
import { CreateTransactionRequest } from '../../models/requests/transaction-request';

const createTransactionZod = z.object({
  payment_type: z.string().min(1),
  transaction_detail: z.object({
    order_id: z.string().min(1),
    amount: z.number().min(1)
  }),
  customer_detail: z.object({
    customer_id: z.string().min(1),
    customer_name: z.string().min(1),
    customer_email: z.string().min(1),
    customer_phone: z.string().min(1)
  }),
  token: z.string().min(1)
});

export const validateCreateTransaction = (data: CreateTransactionRequest) => {
  return createTransactionZod.safeParse(data);
}