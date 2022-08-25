import dgram from "dgram";

export async function udpWrite(
  dataStr: string,
  address: string,
  port: number,
  timeout: number
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket("udp4");
    let to: NodeJS.Timeout;
    client.on("listening", () => {
      setTimeout(() => {
        const data = Buffer.from(dataStr, "ascii");
        client.send(data, 0, data.length, port, address);
        to = setTimeout(() => {
          client.close();
          reject("Connection timeout");
        }, timeout || 5000);
      }, 1000);
    });
    client.on("message", (message) => {
      clearTimeout(to);
      client.close();
      resolve(message);
    });
    client.bind(1025, "0.0.0.0");
  });
}
