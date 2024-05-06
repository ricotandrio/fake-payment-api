import { Wallet } from "@prisma/client";
import { Account } from "../database/account";
import { Merchant } from "../database/merchant";
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

export const toAccountDTO = (account: Account, merchant: Merchant, wallet: Wallet): AccountDTO => {
  return {
    account_id: account.account_id,
    account_name: account.account_name,
    account_type: account.account_type,
    wallet: {
      wallet_name: wallet.wallet_name
    },
    merchant: {
      merchant_name: merchant.merchant_name,
      merchant_email: merchant.merchant_email,
      merchant_phone: merchant.merchant_phone,
      merchant_address: merchant.merchant_address,
      merchant_website: merchant.merchant_website,
      merchant_logo: merchant.merchant_logo
    }
  };
}