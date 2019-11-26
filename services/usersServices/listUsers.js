import { models } from "../../init/dataBaseUtils";

export const listUsers = req => {
  console.log("Здесь");
  return models.User.findAll({ include: [{ model: models.Role }] });
};
