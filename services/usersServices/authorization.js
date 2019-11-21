import User from "../../models/user";
import cryptoJs from "crypto-js";
import { verifyPassword } from "./verifyPassword";

export const authorization = async data => {
  const checkLogin = true;
  let admin = false;

  await User.findOne({ email: data.body.email }, function(err, user) {
    if (err) return (admin = false);
    if (
      verifyPassword(user.password) === data.body.password &&
      user.administration
    )
      return (admin = true);
  });
  const authUser = {
    admin,
    checkLogin,
    logEmail: data.body.email
  };

  return authUser;
};
