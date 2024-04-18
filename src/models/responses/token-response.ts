import { BaseResponse } from "./base-response";

export interface GetTokenSuccessResponse extends BaseResponse {
  token: string;
  expires_in: number;
}

export interface GetTokenFailedResponse extends BaseResponse {}