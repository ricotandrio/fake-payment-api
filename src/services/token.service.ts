import { prismaClient } from "../app/database";
import { logger } from "../app/logging";
import { JWT_SECRET } from "../app/web";
import { ResponseError } from "../utils/error/response.error";
import jwt from "jsonwebtoken";

export class TokenService {

  static async get(authorization: string, user_id: string): Promise<string> {
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

    return token;
  }

  static async verify(token: string, user_id: string): Promise<string> {
    const decoded = jwt.verify(token, JWT_SECRET!) as { user_id: string };

    if(decoded.user_id !== user_id) {
      throw new ResponseError(401, "Unauthorized");
    }

    return decoded.user_id;
  }
}