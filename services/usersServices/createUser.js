import cryptoJs from "crypto-js";
import { models } from "../../init/dataBaseUtils";

export const createUser = async data => {
  const result = await models.User.findAll({
    Where: {
      email: data.email
    }
  });

  if (result == false) {
    let encryptedPass = cryptoJs.AES.encrypt(
      JSON.stringify(data.password),
      "It's easy 322"
    );
    encryptedPass = encryptedPass.toString();
    try {
      await models.User.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: encryptedPass
      });
    } catch (err) {
      return 418;
    }
    return 201;
  } else return 409;
};
