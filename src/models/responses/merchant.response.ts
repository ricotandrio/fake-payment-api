import { BaseResponse } from "./base.response";

export interface MerchantDTO {
  merchant_id: string;
  merchant_name: string;
  merchant_email: string;
  merchant_phone: string;
  merchant_address: string;
  merchant_website: string;
  merchant_logo: string;
  redirect_url: string;
}

export interface CreateMerchantSuccessResponse {
  data: MerchantDTO;
}

export interface CreateMerchantFailedResponse extends BaseResponse {}

export interface GetMerchantSuccessResponse {
  data: MerchantDTO;
}

export interface GetMerchantFailedResponse extends BaseResponse {}

export interface UpdateMerchantSuccessResponse extends BaseResponse {
  data: MerchantDTO;
}

export interface UpdateMerchantFailedResponse extends BaseResponse {}

export interface DeleteMerchantSuccessResponse extends BaseResponse {}

export interface DeleteMerchantFailedResponse extends BaseResponse {}