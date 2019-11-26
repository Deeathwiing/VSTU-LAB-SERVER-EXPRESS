import { models } from "../../init/dataBaseUtils";

export const editNames = req => {
  return models.User.editNames(
    req.body.firstName,
    req.body.lastName,
    req.user.email
  );
};
