import { ZodType, z } from "zod";

export class MerchantValidation {
  static readonly CREATE: ZodType = z.object({
    merchant_name: z.string().min(1).max(255),
    merchant_email: z.string().email(),
    merchant_phone: z.string().min(1).max(15).regex(/^[0-9]*$/, { message: "Invalid phone number"}),
    merchant_address: z.string().min(1).max(255),
    merchant_website: z.string().min(1).max(255),
    merchant_logo: z.string().min(1).max(255),
    redirect_url: z.string().min(1).max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    merchant_id: z.string().min(1).max(255),
    merchant_name: z.string().min(1).max(255),
    merchant_email: z.string().email(),
    merchant_phone: z.string().min(1).max(15).regex(/^[0-9]*$/, { message: "Invalid phone number"}),
    merchant_address: z.string().min(1).max(255),
    merchant_website: z.string().min(1).max(255),
    merchant_logo: z.string().min(1).max(255),
    redirect_url: z.string().min(1).max(255),
  });
}