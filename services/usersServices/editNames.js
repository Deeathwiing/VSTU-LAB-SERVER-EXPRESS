import User from "../../models/user";

export const editNames = data => {
  return User.updateOne(
    { email: data.user.logEmail },
    { firstName: data.firstName, lastName: data.lastName }
  )
    .then(() => 201)
    .catch(() => 409);
};
