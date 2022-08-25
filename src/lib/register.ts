import fetch from "node-fetch";
import { ErrorResponse } from "./ErrorResponse";

export async function register({
  baseUrl,
  email,
  password,
}: {
  baseUrl: string;
  email: string;
  password: string;
}): Promise<
  | {
      token: string;
      user_id: number;
    }
  | ErrorResponse
> {
  const body = new URLSearchParams({
    email,
    password,
  });
  return fetch(`${baseUrl}v1/user/create`, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .catch((_err) => {
      throw new Error("User registration failed");
    });
}
