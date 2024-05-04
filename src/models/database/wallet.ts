import { Log } from "./log";

export interface Wallet extends Log {
  wallet_id: string;
  wallet_name: string;
  wallet_balance: number;
}