import { ErrorResponse } from "./ErrorResponse";

export function isErrorResponse(obj: any): obj is ErrorResponse {
  return typeof obj.error === "string";
}
