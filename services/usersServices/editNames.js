import User from "../../models/user";

export const editNames = req => {
  return User.updateOne(
    { email: req.user.logEmail },
    { firstName: req.body.firstName, lastName: req.body.lastName }
  )
    .then(() => 201)
    .catch(() => 409);
};
