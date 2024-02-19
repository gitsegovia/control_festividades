import crypto from "crypto";
import config_auth from "../configs/config_auth";

export function encrypt(str) {
  return crypto
    .createHash("sha1")
    .update(`${config_auth.prefitHash}${str.toString()}`)
    .digest("hex");
}

export function getBase64(value) {
  const buff = Buffer.from(value, "base64");
  const base64data = buff.toString("utf8");
  const data = JSON.parse(base64data);

  return data;
}

export function setBase64(value) {
  const data = JSON.stringify(value);
  const buff = Buffer.from(data, "utf8");
  const base64data = buff.toString("base64");

  return base64data;
}

export function makeCodeNumeric(length = 12) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
}
