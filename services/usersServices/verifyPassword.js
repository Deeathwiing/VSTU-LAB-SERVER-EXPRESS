import cryptoJs from "crypto-js";

export const verifyPassword = pass =>
  JSON.parse(
    cryptoJs.AES.decrypt(pass.toString(), "It's easy 322").toString(
      cryptoJs.enc.Utf8
    )
  );
