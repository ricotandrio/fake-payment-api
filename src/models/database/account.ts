import { Log } from "./log";

export enum AccountType {
  BANK = "BANK",
  EWALLET = "EWALLET",
}

export interface Account extends Log {
  account_id: string;
  account_name: string;
  account_type: string;
  merchant_id: string;
  wallet_id: string;
}