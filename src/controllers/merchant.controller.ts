import { NextFunction, Request, Response } from "express";
import { CreateMerchantRequest, UpdateMerchantRequest } from "../models/requests/merchant.request";
import { MerchantService } from "../services/merchant.service";

export class MerchantController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateMerchantRequest = req.body as CreateMerchantRequest;

      const response = await MerchantService.create(request);

      res.status(201).json({
        code: 201,
        message: `Merchant created successfully`,
        data: response
      });
      
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateMerchantRequest = req.body as UpdateMerchantRequest;

      const response = await MerchantService.update(request);

      res.status(200).json({
        code: 200,
        message: `Merchant updated successfully`,
        data: response
      });
      
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const merchant_id = req.params.merchant_id;

      const response = await MerchantService.get(merchant_id);

      res.status(200).json({
        code: 200,
        message: `Merchant retrieved successfully`,
        data: response
      });
      
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MerchantService.getAll();

      res.status(200).json({
        code: 200,
        message: `Merchant retrieved successfully`,
        data: response
      });
      
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const merchant_id = req.params.merchant_id;

      const response = await MerchantService.delete(merchant_id);

      res.status(200).json({
        code: 200,
        message: `Merchant deleted successfully`,
        data: response
      });
      
    } catch (error) {
      next(error);
    }
  }
}