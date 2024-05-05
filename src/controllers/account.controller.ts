import { NextFunction, Request, Response } from "express";
import { CreateAccountRequest } from "../models/requests/account.merchant";
import { AccountService } from "../services/account.service";
import { CreateAccountSuccessResponse } from "../models/responses/account.response";

export class AccountController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateAccountRequest = req.body as CreateAccountRequest;
      
      const account = await AccountService.create(request);
      return res.status(201).json({
        code: 201,
        message: "Account created successfully",
        data: account
      } as CreateAccountSuccessResponse);

    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const account_id = req.params.account_id;

      const account = await AccountService.get(account_id);
      return res.status(200).json({
        code: 200,
        message: "Account retrieved successfully",
        data: account
      } as CreateAccountSuccessResponse);

    } catch (error) {
      next(error);
    }
  }
}