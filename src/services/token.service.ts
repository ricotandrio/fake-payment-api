import { prismaClient } from "../app/database";
import { logger } from "../app/logging";
import { JWT_SECRET } from "../app/web";
import { ResponseError } from "../utils/error/response.error";
import { Response } from "express";
import jwt from "jsonwebtoken";

export class TokenService {

  static async get(authorization: string, res: Response): Promise<string> {
    const client = authorization.replace("Basic ", "");
    const [client_id, client_secret] = client.split(":");

    const auth = await prismaClient.auth.findFirst({
      where: {
        client_id,
        client_secret
      }
    });

    if(!auth) {
      throw new ResponseError(401, "Unauthorized");
    }

    const token = jwt.sign({ client_id }, JWT_SECRET!, { expiresIn: "24h" });
    res.cookie("token", token, { maxAge: 24 * 60 * 60, httpOnly: true });

    return token;
  }

  static async verify(token: string): Promise<string> {
    const decoded = jwt.verify(token, JWT_SECRET!) as { client_id: string, exp: number };

    if(!decoded) {
      return "";
    }

    const auth = await prismaClient.auth.findFirst({
      where: {
        client_id: decoded.client_id
      }
    });

    if(!auth) {
      return "";
    }
    
    const currentTime = Math.floor(Date.now() / 1000);

    if(decoded.exp < currentTime) {
      return "";
    }

    return decoded.client_id;
  }

  static async clearCookie(res: Response): Promise<void> {
    res.clearCookie("token");
  }
}