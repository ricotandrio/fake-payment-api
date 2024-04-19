import { Merchant } from "../models/database/merchant";

export class TokenService {

  static async generateToken(): Promise<string> {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' as string;
  }

  static async validateToken(token: string): Promise<Merchant> {
    return {
      "merchant_id": "M123456789",
      "merchant_name": "Example Merchant",
      "merchant_email": "merchant@example.com",
      "merchant_phone": "123-456-7890",
      "merchant_address": "123 Main Street",
      "merchant_country": "United States",
      "merchant_fee": 0.03,
      "currency_symbol": "IDR"
    } as Merchant;
  }
}