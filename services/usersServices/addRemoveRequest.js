import { models } from "../../init/dataBaseUtils";

export const removeRequest = req => {
  return models.User.update(
    { deleteAccountRequest: true },
    {
      where: {
        email: req.user.email
      }
    }
  )
    .then(() => 201)
    .catch(() => 409);
};
