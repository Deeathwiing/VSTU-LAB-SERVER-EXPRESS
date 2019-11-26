import { models } from "../../init/dataBaseUtils";

export const removeRequest = req => {
  return models.User.addRemoveRequest(req.user.id);
};
