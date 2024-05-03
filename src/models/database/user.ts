import { Log } from "./log";

export interface User extends Log {
  user_id: string;
  user_email: string;
  user_name: string;
  client_id: string;
}