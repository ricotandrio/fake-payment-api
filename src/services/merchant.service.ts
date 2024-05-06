import { v4 } from "uuid";
import { CreateMerchantRequest, UpdateMerchantRequest } from "../models/requests/merchant.request";
import { MerchantDTO, toMerchantDTO } from "../models/responses/merchant.response";
import { prismaClient } from "../app/database";
import { ResponseError } from "../utils/error/response.error";
import { Validation } from "../utils/validation/validation";
import { MerchantValidation } from "../utils/validation/merchant.validation";

export class MerchantService {

  static async create(request: CreateMerchantRequest): Promise<MerchantDTO> {
    const merchantRequest = Validation.validate(MerchantValidation.CREATE, request);

    const id = v4();

    const merchant = await prismaClient.merchant.create({
      data: {
        merchant_id: id,
        merchant_name: merchantRequest.merchant_name,
        merchant_email: merchantRequest.merchant_email,
        merchant_phone: merchantRequest.merchant_phone,
        merchant_address: merchantRequest.merchant_address,
        merchant_website: merchantRequest.merchant_website,
        merchant_logo: merchantRequest.merchant_logo,
        redirect_url: merchantRequest.redirect_url,
        is_active: true,
        updated_at: new Date(),
        created_by: id,
        updated_by: id
      }
    });

    return toMerchantDTO(merchant);
  }

  static async update(request: UpdateMerchantRequest): Promise<MerchantDTO> {
    const merchantRequest = Validation.validate(MerchantValidation.UPDATE, request);

    const merchant = await prismaClient.merchant.update({
      where: {
        merchant_id: merchantRequest.merchant_id
      },
      data: {
        merchant_name: merchantRequest.merchant_name,
        merchant_email: merchantRequest.merchant_email,
        merchant_phone: merchantRequest.merchant_phone,
        merchant_address: merchantRequest.merchant_address,
        merchant_website: merchantRequest.merchant_website,
        merchant_logo: merchantRequest.merchant_logo,
        redirect_url: merchantRequest.redirect_url,
        updated_at: new Date()
      }
    });

    return toMerchantDTO(merchant);
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

    return toMerchantDTO(merchant);
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
      return toMerchantDTO(merchant);
    });
  }

}