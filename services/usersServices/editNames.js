import { models } from "../../init/dataBaseUtils";

export const editNames = req => {
  return models.User.update(
    { firstName: req.body.firstName, lastName: req.body.lastName },
    { where: { email: req.user.email } }
  )
    .then(() => 201)
    .catch(err => 409);
};
