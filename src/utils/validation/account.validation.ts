import { ZodType, z } from "zod";

export class AccountValidation {
  static readonly CREATE: ZodType = z.object({
    account_name: z.string().min(1).max(255),
    account_type: z.string().min(1).max(255),
    wallet_name: z.string().min(1).max(255),
    merchant_id: z.string().min(1).max(255),
  });
}