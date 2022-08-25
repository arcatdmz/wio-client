import { updateWifiSetting } from "./lib/updateWiFiSetting";

import * as dotenv from "dotenv";
dotenv.config();

/**
 * This script connects to the specified Wio Node
 * and update Wi-Fi configuration.
 *
 * Example output:
 *
 * $ node dist/wifi.js
 * result: ok
 */

const {
  HOSTNAME: hostname,
  WIFI_SSID: ssid,
  WIFI_PASSWORD: password,
  NODE_KEY: key,
  NODE_SN: sn,
} = process.env;

updateWifiSetting({
  hostname,
  ssid,
  password,
  key,
  sn,
})
  .then((data) => {
    console.log("result:", data);
  })
  .catch((err) => {
    console.error("error:", err.message || err);
  });
