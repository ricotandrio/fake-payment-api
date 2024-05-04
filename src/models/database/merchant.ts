import { Log } from "./log";

export interface Merchant extends Log {
  merchant_id: string;
  merchant_name: string;
  merchant_email: string;
  merchant_phone: string;
  merchant_address: string;
  merchant_website: string;
  merchant_logo: string;
  redirect_url: string;
}