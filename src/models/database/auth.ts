import { Log } from "./log";

export interface Auth extends Log {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

