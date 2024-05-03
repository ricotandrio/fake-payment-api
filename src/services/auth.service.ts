import { prismaClient } from "../app/database";
import { Token } from "../models/database/token";
import { ResponseError } from "../utils/error/response.error";
import { v4 } from "uuid";

export class AuthService {

  static async generateToken(user_id: string, client_secret: string): Promise<Token> {

    const user = await prismaClient.user.findUnique({
      where: {
        user_id
      }
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const clientStatus = await prismaClient.auth.findFirst({
      where: {
        client_id: user.client_id,
        client_secret: client_secret
      }
    });

    if (!clientStatus) {
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
        user_id: user_id,

        is_active: true,
        updated_at: new Date(),
        created_by: user_id,
        updated_by: user_id,
      }
    });

    if (!insertToken) {
      throw new ResponseError(500, "Failed to generate token");
    }

    return insertToken as Token;
  }

  static async validateToken(token: string): Promise<Token> {
    const tokenData = await prismaClient.token.findUnique({
      where: {
        token_id: token
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