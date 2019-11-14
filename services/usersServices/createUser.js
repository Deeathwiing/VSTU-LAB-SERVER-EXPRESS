import User from "../../models/user";
import cryptoJs from "crypto-js";

export const createUser = async data => {
  const result = await User.find({ email: data.email });
  const cipherPass = cryptoJs.AES.encrypt(
    JSON.stringify(data.password),
    "It's easy 322"
  );
  if (result == false) {
    const newUser = new User({
      administration: data.administration,
      deleteAccountRequest: data.deleteAccountRequest,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: cipherPass
    });

    await newUser.save();
    return 201;
  } else return 409;
};
