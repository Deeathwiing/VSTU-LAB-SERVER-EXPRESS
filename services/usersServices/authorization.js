import User from "../../models/user";
import cryptoJs from "crypto-js";

export const authorization = async data => {
  let users = await User.find();

  const checkLogin = users.some(
    user =>
      data.logEmail === user.email &&
      data.logPass ===
        JSON.parse(
          cryptoJs.AES.decrypt(
            user.password.toString(),
            "It's easy 322"
          ).toString(cryptoJs.enc.Utf8)
        )
  );
  const admin = users.some(
    user =>
      data.logEmail === user.email &&
      data.logPass ===
        JSON.parse(
          cryptoJs.AES.decrypt(
            user.password.toString(),
            "It's easy 322"
          ).toString(cryptoJs.enc.Utf8)
        ) &&
      user.administration
  );
  const authUser = {
    admin,
    checkLogin,
    logEmail: data.logEmail
  };

  return authUser;
};
