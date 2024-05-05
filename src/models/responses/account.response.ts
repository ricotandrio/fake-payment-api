import { BaseResponse } from "./base.response";

export interface AccountDTO {
  account_id: string;
  account_name: string;
  account_type: string;
  wallet: {
    wallet_name: string;
  },
  merchant: {
    merchant_name: string;
    merchant_email: string;
    merchant_phone: string;
    merchant_address: string;
    merchant_website: string;
    merchant_logo: string;
  }
}

export interface CreateAccountSuccessResponse extends BaseResponse {
  data: AccountDTO;
}

export interface CreateAccountFailedResponse extends BaseResponse {}

export interface GetAccountSuccessResponse extends BaseResponse {
  data: AccountDTO;
}

export interface GetAccountFailedResponse extends BaseResponse {}