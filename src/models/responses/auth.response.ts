import { Auth } from "../database/auth";
import { BaseResponse } from "./base.response";

export interface CreateAuthDTO {
  client_id: string;
  client_secret: string;
  apps_name: string;
}

export interface CreateAuthSuccessResponse extends BaseResponse {
  data: CreateAuthDTO;
}

export interface CreateAuthFailedResponse extends BaseResponse {}

export interface GetAuthSuccessResponse extends BaseResponse {
  data: CreateAuthDTO;
}

export interface GetAuthFailedResponse extends BaseResponse {}

export const toCreateAuthDTO = (auth: Auth): CreateAuthDTO => {
  return {
    client_id: auth.client_id,
    client_secret: auth.client_secret,
    apps_name: auth.apps_name
  };
}