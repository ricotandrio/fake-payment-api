import { v4 } from "uuid";
import { prismaClient } from "../app/database";
import { CreateAccountRequest } from "../models/requests/account.merchant";
import { AccountDTO } from "../models/responses/account.response";
import { ResponseError } from "../utils/error/response.error";

export class AccountService {
  static async create(request: CreateAccountRequest): Promise<AccountDTO> {
    
    const merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: request.merchant_id
      }
    });
    
    if(!merchant) {
      throw new ResponseError(404 ,"Error: Merchant not found");
    }
    
    const id = v4();

    const account = await prismaClient.account.create({
      data: {
        account_id: id,
        account_name: request.account_name,
        account_type: request.account_type,
        wallet_id: id,
        merchant_id: request.merchant_id,
        is_active: true,
        updated_at: new Date(),
        created_by: id,
        updated_by: id
      }
    });

    const wallet = await prismaClient.wallet.create({
      data: {
        wallet_id: id,
        wallet_name: request.wallet_name,
        wallet_balance: 0,
        is_active: true,
        updated_at: new Date(),
        created_by: id,
        updated_by: id
      }
    });

    return {
      account_id: account.account_id,
      account_name: account.account_name,
      account_type: account.account_type,
      wallet: {
        wallet_name: wallet.wallet_name,
      },
      merchant: {
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_phone: merchant.merchant_phone,
        merchant_address: merchant.merchant_address,
        merchant_website: merchant.merchant_website,
        merchant_logo: merchant.merchant_logo
      }
    } as AccountDTO;

  }

  static async get(accountId: string): Promise<AccountDTO> {
    const account = await prismaClient.account.findFirst({
      where: {
        account_id: accountId
      }
    });

    if(!account) {
      throw new ResponseError(404, "Error: Account not found");
    }

    const wallet = await prismaClient.wallet.findFirst({
      where: {
        wallet_id: account.wallet_id
      }
    });

    if(!wallet) {
      throw new ResponseError(404, "Error: Wallet not found");
    }

    const merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: account.merchant_id
      }
    });

    if(!merchant) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    return {
      account_id: account.account_id,
      account_name: account.account_name,
      account_type: account.account_type,
      wallet: {
        wallet_name: wallet.wallet_name,
      },
      merchant: {
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_phone: merchant.merchant_phone,
        merchant_address: merchant.merchant_address,
        merchant_website: merchant.merchant_website,
        merchant_logo: merchant.merchant_logo
      }
    } as AccountDTO;
  }
}