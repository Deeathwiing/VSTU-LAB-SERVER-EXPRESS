import { models } from "../../init/dataBaseUtils";

export const createUser = data => {
  return models.User.createUser(data);
};
