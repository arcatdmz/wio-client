import fetch from "node-fetch";
import { ErrorResponse } from "./ErrorResponse";

export async function listResources({
  baseUrl,
  token,
}: {
  baseUrl: string;
  token: string;
}): Promise<
  | {
      well_known: string[];
    }
  | ErrorResponse
> {
  return fetch(`${baseUrl}v1/node/.well-known`, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((_err) => {
      throw new Error("Listing well-known resources failed");
    });
}
