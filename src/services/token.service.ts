import { prismaClient } from "../app/database";
import { logger } from "../app/logging";
import { JWT_SECRET } from "../app/web";
import { ResponseError } from "../utils/error/response.error";
import { Response } from "express";
import jwt from "jsonwebtoken";

export class TokenService {

  static async get(authorization: string, user_id: string, res: Response): Promise<void> {
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

    const token = jwt.sign({ user_id }, JWT_SECRET!, { expiresIn: "2h" });
    res.cookie("token", token, { maxAge: 2 * 60 * 60, httpOnly: true });

    return;
  }

  static async verify(token: string): Promise<string> {
    const decoded = jwt.verify(token, JWT_SECRET!) as { user_id: string, expires: Date };

    console.log(decoded);
    
    const currentTime = Date.now() / 1000;
    const expires = new Date(decoded.expires).getTime() / 1000;

    if(currentTime > expires) {
      return "";
    }

    return decoded.user_id;
  }

  static async clearCookie(res: Response): Promise<void> {
    res.clearCookie("token");
  }
}