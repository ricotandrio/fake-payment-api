import { Token } from "../database/token";
import { BaseResponse } from "./base.response";

export interface GetTokenSuccessResponse extends BaseResponse{
  token: string;
}

export interface GetTokenFailedResponse extends BaseResponse {}

export interface TokenVerifySuccessResponse extends BaseResponse {
  user_id: string;
}

export interface TokenVerifyFailedResponse extends BaseResponse {}