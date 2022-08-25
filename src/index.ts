import { create } from "./lib/create";
import { isErrorResponse } from "./lib/isErrorResponse";
import { list } from "./lib/list";
import { listResources } from "./lib/listResources";
import { login } from "./lib/login";
import { register } from "./lib/register";

/**
 * This script login to the Wio Link server (or create a user),
 * get the list of existing nodes,
 * find the node with the specified name (or create a new node),
 * and print out detailed information.
 *
 * Example output:
 *
 * $ node dist/index.js
 * node info: {
 *   name: 'bedroom',
 *   node_key: '[node access token]',
 *   node_sn: '***',
 *   dataxserver: null,
 *   board: 'Wio Node v1.0',
 *   online: true
 * }
 * node resources: [
 *   'GET /v1/node/GroveBME280I2C0/humidity -> uint32_t humidity',
 *   'GET /v1/node/GroveBME280I2C0/temperature -> float temperature',
 *   'GET /v1/node/GroveBME280I2C0/altitude -> float altitude',
 *   'GET /v1/node/GroveBME280I2C0/pressure -> uint32_t pressure',
 * ]
 */

import * as dotenv from "dotenv";
dotenv.config();

const {
  PROTOCOL: protocol = "https",
  SERVER: server,
  PORT: port,
  EMAIL: email,
  PASSWORD: password,
  NODE_NAME: nodeName,
} = process.env;

const baseUrl = `${protocol}://${server}${port ? `:${port}` : ""}/`;

login({
  baseUrl,
  email,
  password,
})
  .then((data) => {
    if (isErrorResponse(data) && data.error.startsWith("Login failed")) {
      throw new Error(data.error);
    }
    return data;
  })
  .catch((_err) =>
    register({
      baseUrl,
      email,
      password,
    })
  )
  .then(async (data) => {
    if (isErrorResponse(data) || !data.token) {
      throw new Error("Authentication failed");
    }
    const { token } = data;
    const res = await list({
      baseUrl,
      token,
    });
    if (isErrorResponse(res) || !Array.isArray(res?.nodes)) {
      throw new Error("Listing nodes failed");
    }
    const existingNode = res.nodes.find((n) => n.name === nodeName);
    if (existingNode) {
      return existingNode;
    }
    return create({
      baseUrl,
      name: nodeName,
      token,
    });
  })
  .then((data) => {
    if (isErrorResponse(data)) {
      throw new Error("Creating node failed");
    }
    console.log("node info:", data);
    return listResources({
      baseUrl,
      token: data.node_key,
    });
  })
  .then((data) => {
    if (isErrorResponse(data)) {
      throw new Error("Printing well-known resources failed");
    }
    console.log("node resources:", data.well_known);
  })
  .catch((err) => {
    console.error("error:", err.message || err);
  });
