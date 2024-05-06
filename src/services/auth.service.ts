import { v4 } from "uuid";
import { CreateAuthRequest } from "../models/requests/auth.request";
import { AuthDTO, toAuthDTO } from "../models/responses/auth.response";
import { prismaClient } from "../app/database";
import { ResponseError } from "../utils/error/response.error";
import { Validation } from "../utils/validation/validation";
import { AuthValidation } from "../utils/validation/auth.validation";

export class AuthService {

  static async create(request: CreateAuthRequest): Promise<AuthDTO> {
    const authRequest = Validation.validate(AuthValidation.CREATE, request);

    const id = v4();
    const secret = v4();

    const auth = await prismaClient.auth.create({
      data: {
        client_id: id,
        client_secret: secret,
        apps_name: authRequest.apps_name,
        is_active: true,
        updated_at: new Date(),
        created_by: id,
        updated_by: id
      }
    });

    return toAuthDTO(auth);
  }

  static async get(client_id: string, client_secret: string): Promise<AuthDTO> {
    const auth = await prismaClient.auth.findFirst({
      where: {
        client_id: client_id,
        client_secret: client_secret
      }
    });

    if(!auth) {
      throw new ResponseError(404, "Error: Auth not found");
    }

    return toAuthDTO(auth);
  }
}