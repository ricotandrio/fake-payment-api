import { v4 } from "uuid";
import { prismaClient } from "../app/database";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../models/requests/transaction.request";
import { ResponseError } from "../utils/error/response.error";
import { TokenService } from "./token.service";
import { TransactionStatus, TransactionType } from "../models/database/transaction";
import { TransactionDTO } from "../models/responses/transaction.response";

export class TransactionService {

  static async create(request: CreateTransactionRequest, token: string): Promise<TransactionDTO> {
    const client_id = await TokenService.verify(token);

    if(!client_id) {
      throw new ResponseError(401, "Unauthorized: Invalid Token due to expired, invalid token not exists in auth");
    }

    const account = await prismaClient.account.findFirst({
      where: {
        account_id: request.account_id
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

    if((request.transaction_type === TransactionType.DEBIT || request.transaction_type === TransactionType.TRANSFER) 
      && wallet.wallet_balance < request.transaction_amount
    ) {
      throw new ResponseError(400, "Error: Insufficient balance");
    }

    const makePayment = await prismaClient.wallet.update({
      where: {
        wallet_id: wallet.wallet_id
      },
      data: {
        wallet_balance: wallet.wallet_balance - request.transaction_amount
      }
    });

    if(!makePayment) {
      throw new ResponseError(400, "Error: Failed to make payment");
    }

    const merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: account.merchant_id
      }
    });

    if(!merchant) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    const id = v4();

    const transaction = await prismaClient.transaction.create({
      data: {
        transaction_id: id,
        transaction_type: request.transaction_type,
        transaction_date: request.transaction_date,
        transaction_amount: request.transaction_amount,
        transaction_status: TransactionStatus.PENDING,
        transaction_note: request.transaction_note,
        user_id: request.user.user_id,
        is_active: true,
        updated_at: new Date(),
        created_by: request.user.user_id,
        updated_by: request.user.user_id,
        account_id: request.account_id,
        client_id: client_id
      }
    });

    return {
      transaction_id: transaction.transaction_id,
      transaction_type: transaction.transaction_type as TransactionType,
      transaction_date: transaction.transaction_date,
      transaction_amount: transaction.transaction_amount,
      transaction_status: transaction.transaction_status as TransactionStatus,
      transaction_note: transaction.transaction_note || "",
      payment_url: `merchant.redirect_url/${transaction.transaction_id}`,
      user_id: transaction.user_id,
      merchant: {
        merchant_id: merchant.merchant_id,
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_phone: merchant.merchant_phone,
        merchant_address: merchant.merchant_address,
        merchant_website: merchant.merchant_website,
      }
    } as TransactionDTO;
  }

  static async update(request: UpdateTransactionRequest): Promise<TransactionDTO> {
    const transaction = await prismaClient.transaction.update({
      where: {
        transaction_id: request.transaction_id
      },
      data: {
        transaction_status: request.status,
        updated_at: new Date()
      }
    });

    if(!transaction) {
      throw new ResponseError(400, "Error: Failed to update transaction");
    }

    const account = await prismaClient.account.findFirst({
      where: {
        account_id: transaction.account_id
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

    if(transaction.transaction_status === TransactionStatus.SUCCESS) {
      await prismaClient.wallet.update({
        where: {
          wallet_id: wallet.wallet_id
        },
        data: {
          wallet_balance: wallet.wallet_balance + transaction.transaction_amount
        }
      });
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
      transaction_id: transaction.transaction_id,
      transaction_type: transaction.transaction_type as TransactionType,
      transaction_date: transaction.transaction_date,
      transaction_amount: transaction.transaction_amount,
      transaction_status: transaction.transaction_status as TransactionStatus,
      transaction_note: transaction.transaction_note || "",
      payment_url: `merchant.redirect_url/${transaction.transaction_id}`,
      user_id: transaction.user_id,
      merchant: {
        merchant_id: merchant.merchant_id,
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_phone: merchant.merchant_phone,
        merchant_address: merchant.merchant_address,
        merchant_website: merchant.merchant_website,
      }
    } as TransactionDTO;
  }
}