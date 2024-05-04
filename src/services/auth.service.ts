import { prismaClient } from "../app/database";
import { Token } from "../models/database/token";
import { GetTokenRequest, ValidateTokenRequest } from "../models/requests/token.request";
import { ResponseError } from "../utils/error/response.error";
import { v4 } from "uuid";

export class AuthService {

  static async generateToken(request: GetTokenRequest): Promise<Token> {

    const client = await prismaClient.auth.findFirst({
      where: {
        client_id: request.client_id,
        client_secret: request.client_secret
      }
    });

    if (!client) {
      throw new ResponseError(404, "Client not found");
    }

    const token = v4();
    const expiredTimeOut = new Date();
    expiredTimeOut.setHours(expiredTimeOut.getHours() + 24);

    const insertToken = await prismaClient.token.create({
      data: {
        token_id: token,
        token_type: "access",
        token_exp: expiredTimeOut,
        user_id: request.user_id,
        client_id: request.client_id,

        is_active: true,
        updated_at: new Date(),
        created_by: request.user_id,
        updated_by: request.user_id,
      }
    });

    if (!insertToken) {
      throw new ResponseError(500, "Failed to generate token");
    }

    return insertToken as Token;
  }

  static async validateToken(request: ValidateTokenRequest): Promise<Token> {
    const tokenData = await prismaClient.token.findUnique({
      where: {
        token_id: request.token,
        user_id: request.user_id,
      }
    });

    if (!tokenData) {
      throw new ResponseError(404, "Token not found");
    }

    if (tokenData.token_exp < new Date()) {
      throw new ResponseError(401, "Token expired");
    }

    return tokenData as Token;
  }
}