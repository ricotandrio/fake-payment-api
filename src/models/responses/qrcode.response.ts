import { BaseResponse } from "./base.response";

export interface QRCodeGeneratedResponse extends BaseResponse {
  qrcode: ArrayBuffer | Blob | File;
}

export interface QRCodeNotFoundResponse extends BaseResponse {}