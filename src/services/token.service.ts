import { prismaClient } from "../app/database";
import { logger } from "../app/logging";
import { JWT_SECRET } from "../app/web";
import { ResponseError } from "../utils/error/response.error";
import { Response } from "express";
import jwt from "jsonwebtoken";

export class TokenService {

  static async get(authorization: string): Promise<string> {
    const client = authorization.replace("Basic ", "");
    const [client_id, client_secret] = client.split(":");

    const auth = await prismaClient.auth.findFirst({
      where: {
        client_id,
        client_secret
      }
    });

    if(!auth) {
      throw new ResponseError(401, "Unauthorized: Client is not found");
    }

    const token = jwt.sign({ client_id }, JWT_SECRET!, { expiresIn: "24h" });

    return token;
  }
}