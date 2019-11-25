import { models } from "../../init/dataBaseUtils";

export const deleteUser = id => {
  console.log(id);
  return models.User.destroy({ where: { id: id } })
    .then(() => 201)
    .catch(() => 409);
};
