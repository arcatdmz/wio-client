import fetch from "node-fetch";
import { ErrorResponse } from "./ErrorResponse";

export async function login({
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
    }
  | ErrorResponse
> {
  const body = new URLSearchParams({
    email,
    password,
  });
  return fetch(`${baseUrl}v1/user/login`, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .catch((_err) => {
      throw new Error("Login failed");
    });
}
