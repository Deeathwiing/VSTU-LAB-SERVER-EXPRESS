import User from "../../models/user";

export const listUsers = req => {
  console.log(req.isAuthenticated());
  return User.find();
};
