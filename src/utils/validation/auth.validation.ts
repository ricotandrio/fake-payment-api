import { ZodType, z } from "zod";

export class AuthValidation {
  static readonly CREATE: ZodType = z.object({
    apps_name: z.string().min(4).max(255),
  })
}