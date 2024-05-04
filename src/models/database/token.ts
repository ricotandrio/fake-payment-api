import { Log } from "./log";

export interface Token extends Log {
  token_id: string;
  token_type: "access" | "refresh";
  token_exp: Date;
  user_id: string;
  client_id: string;
}