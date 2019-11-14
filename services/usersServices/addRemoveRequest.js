import User from "../../models/user";

export const removeRequest = data => {
  return User.updateOne(
    { email: data.logEmail },
    { deleteAccountRequest: true }
  )
    .then(() => 201)
    .catch(() => 409);
};
