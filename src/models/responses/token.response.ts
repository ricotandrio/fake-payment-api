import { Token } from "../database/token";
import { BaseResponse } from "./base.response";

export interface GetTokenSuccessResponse extends BaseResponse {
  data: Token;
}

export interface GetTokenFailedResponse extends BaseResponse {}