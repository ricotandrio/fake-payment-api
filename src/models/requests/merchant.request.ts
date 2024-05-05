export interface CreateMerchantRequest {
  merchant_name: string;
  merchant_email: string;
  merchant_phone: string;
  merchant_address: string;
  merchant_website: string;
  merchant_logo: string;
  redirect_url: string;
}

export interface UpdateMerchantRequest {
  merchant_id: string;
  merchant_name: string;
  merchant_email: string;
  merchant_phone: string;
  merchant_address: string;
  merchant_website: string;
  merchant_logo: string;
  redirect_url: string;
}