import { prismaClient } from "../app/database";
import { TransactionStatus } from "../models/database/transaction";
import { CreateTransactionRequest } from "../models/requests/transaction.request";
import { TransactionSuccessDataResponse } from "../models/responses/transaction.response";
import { ResponseError } from "../utils/error/response.error";
import { v4 } from "uuid";

export class TransactionService {

  static async create(request: CreateTransactionRequest): Promise<TransactionSuccessDataResponse>{
    
    const validateToken = await prismaClient.token.findFirst({
      where: {
        token_id: request.token
      }
    });

    if(!validateToken){
      throw new ResponseError(404, "Token not valid");
    }

    if(validateToken.token_exp < new Date()){
      throw new ResponseError(401, "Token expired");
    }

    const merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: request.merchant_id
      }
    });

    if(!merchant){
      throw new ResponseError(404, "Merchant not found");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        user_id: request.user.user_id
      }
    });

    if(!user){
      const insertUser = await prismaClient.user.create({
        data: {
          user_id: request.user.user_id,
          user_email: request.user.user_email,
          user_name: request.user.user_name,
          client_id: validateToken.client_id,
          is_active: true,
          updated_at: new Date(),
          created_by: request.user.user_id,
          updated_by: request.user.user_id
        }
      });

      if(!insertUser){
        throw new ResponseError(500, "User not found and failed to create user");
      }
    }

    const transacitionUUID = v4();

    const insertTransaction = await prismaClient.transaction.create({
      data: {
        transaction_id: transacitionUUID,
        transaction_type: request.transaction_type,
        transaction_date: request.transaction_date,
        transaction_amount: request.transaction_amount,
        transaction_status: TransactionStatus.PENDING,
        transaction_note: request.transaction_note || "",
        transaction_currency: request.transaction_currency,
        user_id: request.user.user_id,
        merchant_id: request.merchant_id,
        is_active: true,
        updated_at: new Date(),
        created_by: request.user.user_id,
        updated_by: request.user.user_id
      }
    });

    if(!insertTransaction){
      throw new ResponseError(500, "Failed to create transaction");
    }
    
    return {
      transaction_id: transacitionUUID,
      transaction_type: request.transaction_type,
      transaction_date: request.transaction_date,
      transaction_amount: request.transaction_amount,
      transaction_status: TransactionStatus.PENDING,
      transaction_note: request.transaction_note || "",
      transaction_currency: request.transaction_currency,
      user: {
        user_id: request.user.user_id,
        user_email: request.user.user_email,
        user_name: request.user.user_name
      },
      merchant: {
        merchant_id: merchant.merchant_id,
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_phone: merchant.merchant_phone,
        merchant_address: merchant.merchant_address,
        merchant_website: merchant.merchant_website,
        redirect_uri: merchant.redirect_uri
      }
    } as TransactionSuccessDataResponse;
    
  } 

  static async update(transaction_id: string, status: TransactionStatus): Promise<TransactionSuccessDataResponse>{
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        transaction_id: transaction_id
      }
    });

    if(!transaction){
      throw new ResponseError(404, "Transaction not found");
    }

    const merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: transaction.merchant_id
      }
    });

    if(!merchant){
      throw new ResponseError(404, "Merchant not found");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        user_id: transaction.user_id
      }
    });

    if(!user){
      throw new ResponseError(404, "User not found");
    }
  
    const updateTransaction = await prismaClient.transaction.update({
      where: {
        transaction_id: transaction_id
      },
      data: {
        transaction_status: status,
        updated_at: new Date()
      }
    });

    if(!updateTransaction){
      throw new ResponseError(500, "Failed to update transaction");
    }

    return {
      transaction_id: transaction_id,
      transaction_type: transaction.transaction_type,
      transaction_date: transaction.transaction_date,
      transaction_amount: transaction.transaction_amount,
      transaction_status: status,
      transaction_note: transaction.transaction_note,
      transaction_currency: transaction.transaction_currency,
      user: {
        user_id: user.user_id,
        user_email: user.user_email,
        user_name: user.user_name
      },
      merchant: {
        merchant_id: merchant.merchant_id,
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_phone: merchant.merchant_phone,
        merchant_address: merchant.merchant_address,
        merchant_website: merchant.merchant_website,
        redirect_uri: merchant.redirect_uri
      }
    } as TransactionSuccessDataResponse;
  }
}