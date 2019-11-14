import User from "../../models/user";

export const deleteUser = id => {
  return User.findByIdAndDelete(id)
    .then(() => 201)
    .catch(() => 409);
};
