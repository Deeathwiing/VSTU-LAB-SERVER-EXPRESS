import User from "../../models/user";

export const authorization = async data => {
  let users = await User.find();

  const checkLogin = users.some(
    user => data.logEmail === user.email && data.logPass === user.password
  );
  const admin = users.some(
    user =>
      data.logEmail === user.email &&
      data.logPass === user.password &&
      user.administration
  );
  const authUser = {
    admin,
    checkLogin,
    logEmail: data.logEmail
  };

  return authUser;
};
