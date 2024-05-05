import { NextFunction, Request, Response } from "express";
import { CreateAuthSuccessResponse } from "../models/responses/auth.response";
import { CreateAuthRequest } from "../models/requests/auth.request";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateAuthRequest = req.body as CreateAuthRequest;

      const response = await AuthService.create(request);

      res.status(201).json({
        code: 201,
        message: `Auth for ${response.apps_name} is created successfully`,
        data: response
      } as CreateAuthSuccessResponse);

    } catch(e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const client_id = req.params.client_id;
      const client_secret = req.params.client_secret;

      const response = await AuthService.get(client_id, client_secret);

      res.status(200).json({
        code: 200,
        message: `Auth for ${response.apps_name} is retrieved successfully`,
        data: response
      } as CreateAuthSuccessResponse);

    } catch(e) {
      next(e);
    }
  }

}