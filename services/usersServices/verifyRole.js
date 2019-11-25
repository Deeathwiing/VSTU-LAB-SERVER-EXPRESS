import { models } from "../../init/dataBaseUtils";
import { parsingArrayRoles } from "./parsingArrayRoles";

export const verifyRole = async (id, typeOfRole) => {
  let result = await models.User.findOne({ where: { id } })
    .then(user => user.getRoles())
    .then(roles => parsingArrayRoles(roles, typeOfRole));
  return result;
};
