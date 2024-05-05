import { v4 } from "uuid";
import { CreateMerchantRequest, UpdateMerchantRequest } from "../models/requests/merchant.request";
import { MerchantDTO } from "../models/responses/merchant.response";
import { prismaClient } from "../app/database";
import { ResponseError } from "../utils/error/response.error";

export class MerchantService {

  static async create(request: CreateMerchantRequest): Promise<MerchantDTO> {
    const id = v4();

    const merchant = await prismaClient.merchant.create({
      data: {
        merchant_id: id,
        merchant_name: request.merchant_name,
        merchant_email: request.merchant_email,
        merchant_phone: request.merchant_phone,
        merchant_address: request.merchant_address,
        merchant_website: request.merchant_website,
        merchant_logo: request.merchant_logo,
        redirect_url: request.redirect_url,
        is_active: true,
        updated_at: new Date(),
        created_by: id,
        updated_by: id
      }
    });

    return {
      merchant_id: merchant.merchant_id,
      merchant_name: merchant.merchant_name,
      merchant_email: merchant.merchant_email,
      merchant_phone: merchant.merchant_phone,
      merchant_address: merchant.merchant_address,
      merchant_website: merchant.merchant_website,
      merchant_logo: merchant.merchant_logo,
      redirect_url: merchant.redirect_url
    } as MerchantDTO;
  }

  static async update(request: UpdateMerchantRequest): Promise<MerchantDTO> {
    const merchant = await prismaClient.merchant.update({
      where: {
        merchant_id: request.merchant_id
      },
      data: {
        merchant_name: request.merchant_name,
        merchant_email: request.merchant_email,
        merchant_phone: request.merchant_phone,
        merchant_address: request.merchant_address,
        merchant_website: request.merchant_website,
        merchant_logo: request.merchant_logo,
        redirect_url: request.redirect_url,
        updated_at: new Date()
      }
    });

    return {
      merchant_id: merchant.merchant_id,
      merchant_name: merchant.merchant_name,
      merchant_email: merchant.merchant_email,
      merchant_phone: merchant.merchant_phone,
      merchant_address: merchant.merchant_address,
      merchant_website: merchant.merchant_website,
      merchant_logo: merchant.merchant_logo,
      redirect_url: merchant.redirect_url
    } as MerchantDTO;
  }

  static async get(merchantId: string): Promise<MerchantDTO> {
    const merchant = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: merchantId
      }
    });

    if(!merchant) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    return {
      merchant_id: merchant.merchant_id,
      merchant_name: merchant.merchant_name,
      merchant_email: merchant.merchant_email,
      merchant_phone: merchant.merchant_phone,
      merchant_address: merchant.merchant_address,
      merchant_website: merchant.merchant_website,
      merchant_logo: merchant.merchant_logo,
      redirect_url: merchant.redirect_url
    } as MerchantDTO;
  }

  static async delete(merchantId: string): Promise<void> {
    const find = await prismaClient.merchant.findFirst({
      where: {
        merchant_id: merchantId
      }
    });

    if(!find) {
      throw new ResponseError(404, "Error: Merchant not found");
    }

    await prismaClient.merchant.delete({
      where: {
        merchant_id: merchantId
      }
    });

    return;
  }

  static async getAll(): Promise<MerchantDTO[]> {
    const merchants = await prismaClient.merchant.findMany();

    return merchants.map(merchant => {
      return {
        merchant_id: merchant.merchant_id,
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_phone: merchant.merchant_phone,
        merchant_address: merchant.merchant_address,
        merchant_website: merchant.merchant_website,
        merchant_logo: merchant.merchant_logo,
        redirect_url: merchant.redirect_url
      } as MerchantDTO;
    });
  }

}