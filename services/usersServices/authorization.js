import { models } from "../../init/dataBaseUtils";

export const authorization = async req => {
  const checkLogin = true;
  let admin = false;

  admin = await models.User.verifyRole(req.user.id, "administration");

  const authUser = {
    admin,
    checkLogin,
    logEmail: req.user.email
  };

  return authUser;
};
