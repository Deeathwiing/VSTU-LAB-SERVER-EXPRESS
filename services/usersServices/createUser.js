import User from "../../models/user";

export const createUser = async data => {
  const result = await User.find({ email: data.email });

  if (result == false) {
    const newUser = new User({
      administration: data.administration,
      deleteAccountRequest: data.deleteAccountRequest,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password
    });

    await newUser.save();
    return 201;
  } else return 409;
};
