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