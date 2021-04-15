import express from "express";
import crypto from "crypto";
// import pkcs7 from "pkcs7";
const pkcs7 = require("pkcs7");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening");
});

const password = "이것은 비밀번호 입니다.";
const key = "01234567890123456789012345678901";
const ivKey = key.substring(0, 16);
const AES256 = "AES-256-CBC";

const encrypt = (utf8Text: string) => {
  const cipher = crypto.createCipheriv(AES256, key, ivKey);
  cipher.setAutoPadding(false);
  let encrypted = cipher.update(pkcs7Pad(utf8Text), undefined, "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const decrypt = (base64Text: string) => {
  const decipher = crypto.createDecipheriv(AES256, key, ivKey);
  decipher.setAutoPadding(false);
  let decrypted = decipher.update(base64Text, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return pkcs7Unpad(decrypted);
};

const pkcs7Pad = (params: string) => {
  const buffer = Buffer.from(params, "utf8");
  const bytes = new Uint8Array(buffer.length);
  let i = buffer.length;
  while (i--) {
    bytes[i] = buffer[i];
  }
  return Buffer.from(pkcs7.pad(bytes) as Uint8Array);
};

const pkcs7Unpad = (params: string) => {
  const buffer = Buffer.from(params, "utf8");
  const bytes = new Uint8Array(buffer.length);
  let i = buffer.length;
  while (i--) {
    bytes[i] = buffer[i];
  }
  const result = Buffer.from(pkcs7.unpad(bytes) as Uint8Array);
  return result.toString("utf8");
};

const encrypted = encrypt(password);
const decrypted = decrypt(password);

console.log(encrypted);
console.log(decrypted);
