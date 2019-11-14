import User from "../../models/user";

export const listUsers = () => {
  return User.find();
};
