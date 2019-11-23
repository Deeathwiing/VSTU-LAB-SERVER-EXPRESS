import User from "../../models/user";

export const removeRequest = req => {
  return User.updateOne(
    { email: req.user.email },
    { deleteAccountRequest: true }
  )
    .then(() => 201)
    .catch(() => 409);
};
