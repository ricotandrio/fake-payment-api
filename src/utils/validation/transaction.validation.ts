import { ZodType, z } from "zod";

export class TransactionValidation {
  static readonly CREATE: ZodType = z.object({
    transaction_type: z.string().min(1).max(255),
    transaction_date: z.string(),
    transaction_amount: z.number().positive(),
    transaction_note: z.string().optional(),
    user: z.object({
      user_id: z.string().min(1).max(255),
      user_email: z.string().email(),
      user_name: z.string().min(1).max(255),
    }),
    account_id: z.string().min(1).max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    transaction_id: z.string().min(1).max(255),
    status: z.string().min(1).max(255),
  });

}