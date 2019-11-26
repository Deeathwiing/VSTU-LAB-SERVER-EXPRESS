import { models } from "../../init/dataBaseUtils";

export const deleteUser = id => {
  return models.User.deleteUser(id);
};
