import fetch from "node-fetch";
import { ErrorResponse } from "./ErrorResponse";

export async function list({
  baseUrl,
  token,
}: {
  baseUrl: string;
  token: string;
}): Promise<
  | {
      nodes: {
        node_key: string;
        node_sn: string;
        name: string;
        dataxserver: string | null;
        board: string;
        online: boolean;
      }[];
    }
  | ErrorResponse
> {
  return fetch(`${baseUrl}v1/nodes/list`, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((_err) => {
      throw new Error("Listing nodes failed");
    });
}
