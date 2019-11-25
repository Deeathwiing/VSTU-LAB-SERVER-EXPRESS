import { verifyPassword } from "./verifyPassword";
import { models } from "../../init/dataBaseUtils";
import { verifyRole } from "./verifyRole";

export const authorization = async req => {
  const checkLogin = true;
  let admin = false;

  admin = await verifyRole(req.user.id, "administration");

  const authUser = {
    admin,
    checkLogin,
    logEmail: req.user.email
  };

  return authUser;
};
