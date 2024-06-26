import { v4 } from "uuid";
import { prismaClient } from "../app/database";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../models/requests/transaction.request";
import { ResponseError } from "../utils/error/response.error";
import { Transaction, TransactionStatus, TransactionType } from "../models/database/transaction";
import { toTransactionDTO, TransactionDTO } from "../models/responses/transaction.response";
import { Merchant } from "../models/database/merchant";
import { Wallet } from "../models/database/wallet";
import { Account } from "../models/database/account";
import { Validation } from "../utils/validation/validation";
import { TransactionValidation } from "../utils/validation/transaction.validation";
import { AuthDTO } from "../models/responses/auth.response";
import qrCode from "qrcode";

export class TransactionService {

  static async create(request: CreateTransactionRequest, client: AuthDTO): Promise<TransactionDTO> {
    const transactionRequest = Validation.validate(TransactionValidation.CREATE, request);

    const account: Account = await prismaClient.account.findFirst({
      where: {
        account_id: transactionRequest.account_id
      }
    }) as Account;

    if(!account) {
      throw new ResponseError(404, "Error: Account not found");
    }

    const wallet: Wallet = await prismaClient.wallet.findFirst({
      where: {
        wallet_id: account.wallet_id
      }
    }) as Wallet;

    if(!wallet) {
      throw new ResponseError(404, "Error: Wallet not found");
    }

    if((transactionRequest.transaction_type === TransactionType.DEBIT || transactionRequest.transaction_type === TransactionType.TRANSFER) 
      && wallet.wallet_balance < transactionRequest.transaction_amount
    ) {
      throw new ResponseError(400, "Error: Insufficient balance");
    }

    const makePayment = await prismaClient.wallet.update({
      where: {
        wallet_id: wallet.wallet_id
      },
      data: {
        wallet_balance: wallet.wallet_balance - transactionRequest.transaction_amount
      }
    });

    if(!makePayment) {
      throw new ResponseError(400, "Error: Failed to make payment");
    }

    const merchant: Merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: account.merchant_id
      }
    }) as Merchant;

    if(!merchant) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    const id = v4();

    const transaction: Transaction = await prismaClient.transaction.create({
      data: {
        transaction_id: id,
        transaction_type: transactionRequest.transaction_type,
        transaction_date: transactionRequest.transaction_date,
        transaction_amount: transactionRequest.transaction_amount,
        transaction_status: TransactionStatus.SUCCESS,
        transaction_note: transactionRequest.transaction_note,
        user_id: transactionRequest.user.user_id,
        is_active: true,
        updated_at: new Date(),
        created_by: transactionRequest.user.user_id,
        updated_by: transactionRequest.user.user_id,
        account_id: transactionRequest.account_id,
        client_id: client.client_id
      }
    }) as Transaction;


    return toTransactionDTO(transaction, merchant);
  }

  static async update(request: UpdateTransactionRequest): Promise<TransactionDTO> {

    const transactionRequest = Validation.validate(TransactionValidation.UPDATE, request);

    const transaction: Transaction = await prismaClient.transaction.update({
      where: {
        transaction_id: transactionRequest.transaction_id
      },
      data: {
        transaction_status: transactionRequest.status,
        updated_at: new Date()
      }
    }) as Transaction;

    if(!transaction) {
      throw new ResponseError(400, "Error: Failed to update transaction");
    }

    const account: Account = await prismaClient.account.findFirst({
      where: {
        account_id: transaction.account_id
      }
    }) as Account;

    if(!account) {
      throw new ResponseError(404, "Error: Account not found");
    }

    const wallet: Wallet = await prismaClient.wallet.findFirst({
      where: {
        wallet_id: account.wallet_id
      }
    }) as Wallet;

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

    const merchant: Merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: account.merchant_id
      }
    }) as Merchant;

    if(!merchant) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    return toTransactionDTO(transaction, merchant);
  }

  static async get(transaction_id: string): Promise<TransactionDTO> {
      
    const transaction: Transaction = await prismaClient.transaction.findFirst({
      where: {
        transaction_id: transaction_id
      }
    }) as Transaction;

    if(!transaction) {
      throw new ResponseError(404, "Error: Transaction not found");
    }

    const account: Account = await prismaClient.account.findFirst({
      where: {
        account_id: transaction.account_id
      }
    }) as Account;

    if(!account) {
      throw new ResponseError(404, "Error: Account not found");
    }

    const merchant: Merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: account.merchant_id
      }
    }) as Merchant;

    if(!merchant) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    return toTransactionDTO(transaction, merchant);
  }

  static async getAll(client_id: string): Promise<TransactionDTO[]> {
    const transactions: Transaction[] = await prismaClient.transaction.findMany({
      where: {
        client_id: client_id
      }
    }) as Transaction[];

    if(!transactions) {
      throw new ResponseError(404, "Error: Transactions not found");
    }

    const transactionDTOs: TransactionDTO[] = [];

    for(const transaction of transactions) {
      const account: Account = await prismaClient.account.findFirst({
        where: {
          account_id: transaction.account_id
        }
      }) as Account;

      const merchant: Merchant = await prismaClient.merchant.findFirst({
        where: {
          merchant_id: account.merchant_id
        }
      }) as Merchant;

      transactionDTOs.push(toTransactionDTO(transaction, merchant));
    }

    return transactionDTOs;
  }

  static async toQrCode(transaction_id: string): Promise<string> {
    const transaction: Transaction = await prismaClient.transaction.findFirst({
      where: {
        transaction_id: transaction_id
      }
    }) as Transaction;

    if(!transaction) {
      throw new ResponseError(404, "Error: Transaction not found");
    }

    const account: Account = await prismaClient.account.findFirst({
      where: {
        account_id: transaction.account_id
      }
    }) as Account;

    if(!account) {
      throw new ResponseError(404, "Error: Account not found");
    }

    const merchant: Merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: account.merchant_id
      }
    }) as Merchant;

    if(!merchant) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    const url = `${merchant.redirect_url}/${transaction.transaction_id}`;
    const image_path = `public/qr-codes/${transaction.transaction_id}.png`;

    await qrCode.toFile(image_path, url);

    return image_path;
  }
}