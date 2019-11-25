import cryptoJs from "crypto-js";
import { models } from "../../init/dataBaseUtils";

export const createUser = async data => {
  const result = await models.User.findOne({
    where: {
      email: data.email
    }
  });
  if (result == null) {
    let encryptedPass = cryptoJs.AES.encrypt(
      JSON.stringify(data.password),
      "It's easy 322"
    );
    encryptedPass = encryptedPass.toString();
    try {
      const user = await models.User.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: encryptedPass
      });
      const role = await models.Role.findOne({ where: { userRole: "user" } });
      await user.addRole(role);
    } catch (err) {
      return 418;
    }
    return 201;
  } else return 409;
};
