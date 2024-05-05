import { v4 } from "uuid";
import { CreateAuthRequest } from "../models/requests/auth.request";
import { CreateAuthDTO } from "../models/responses/auth.response";
import { prismaClient } from "../app/database";
import { ResponseError } from "../utils/error/response.error";

export class AuthService {

  static async create(request: CreateAuthRequest): Promise<CreateAuthDTO> {
    const id = v4();
    const secret = v4();

    const auth = await prismaClient.auth.create({
      data: {
        client_id: id,
        client_secret: secret,
        apps_name: request.apps_name,
        is_active: true,
        updated_at: new Date(),
        created_by: id,
        updated_by: id
      }
    });

    return {
      client_id: auth.client_id,
      client_secret: auth.client_secret,
      apps_name: auth.apps_name
    } as CreateAuthDTO;
  }

  static async get(client_id: string, client_secret: string): Promise<CreateAuthDTO> {
    const auth = await prismaClient.auth.findFirst({
      where: {
        client_id: client_id,
        client_secret: client_secret
      }
    });

    if(!auth) {
      throw new ResponseError(404, "Error: Auth not found");
    }

    return {
      client_id: auth.client_id,
      client_secret: auth.client_secret,
      apps_name: auth.apps_name
    } as CreateAuthDTO;
  }
}