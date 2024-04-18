import { Merchant } from "../../models/database/merchant";

export const TokenValidator = (token: string) => {

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
  
};