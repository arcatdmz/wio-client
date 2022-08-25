import fetch from "node-fetch";
import { ErrorResponse } from "./ErrorResponse";

export async function create({
  baseUrl,
  name,
  board = "Wio Node v1.0",
  token,
}: {
  baseUrl: string;
  name: string;
  board?: string;
  token: string;
}): Promise<
  | {
      node_key: string;
      node_sn: string;
    }
  | ErrorResponse
> {
  const body = new URLSearchParams({
    name,
    board,
  });
  return fetch(`${baseUrl}v1/nodes/create`, {
    method: "POST",
    body,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((_err) => {
      throw new Error("Node creation failed");
    });
}
