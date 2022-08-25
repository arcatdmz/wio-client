import { udpWrite } from "./udpWrite";

const AP_IP = "192.168.4.1";
const AP_PORT = 1025;

export async function updateWifiSetting({
  hostaddress,
  hostname,
  ssid,
  password,
  key,
  sn,
}: {
  hostaddress?: string;
  hostname?: string;
  ssid: string;
  password: string;
  key: string;
  sn: string;
}): Promise<string> {
  const versionBuffer = await udpWrite("VERSION", AP_IP, AP_PORT, 5000);
  const version = parseFloat(versionBuffer.toString());
  if (isNaN(version)) {
    throw new Error("Failed to get VERSION.");
  }
  const domain = version <= 1.1 ? hostaddress : hostname;
  const resultBuffer = await udpWrite(
    `APCFG: ${ssid}\t${password}\t${key}\t${sn}\t${domain}\t${domain}\t`,
    AP_IP,
    AP_PORT,
    5000
  );
  const result = resultBuffer.toString();
  if (!result.startsWith("ok")) {
    throw new Error("Failed to write APCFG.");
  }
  return result;
}
