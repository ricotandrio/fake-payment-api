import { Merchant } from "@prisma/client";
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

export const toMerchantDTO = (merchant: Merchant): MerchantDTO => {
  return {
    merchant_id: merchant.merchant_id,
    merchant_name: merchant.merchant_name,
    merchant_email: merchant.merchant_email,
    merchant_phone: merchant.merchant_phone,
    merchant_address: merchant.merchant_address,
    merchant_website: merchant.merchant_website,
    merchant_logo: merchant.merchant_logo,
    redirect_url: merchant.redirect_url
  };
}