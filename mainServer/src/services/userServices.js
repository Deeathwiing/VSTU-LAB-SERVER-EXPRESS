const cryptoJs = require("crypto-js"),
  UserRep = require("../repository/userRepository");

class UserServices {
  addRemoveRequest = req => {
    return UserRep.addRemoveRequest(req.user.id);
  };

  verifyPassword = pass =>
    JSON.parse(
      cryptoJs.AES.decrypt(pass.toString(), process.env.SECRET_KEY).toString(
        cryptoJs.enc.Utf8
      )
    );

  listUsers = async (amount, page, firstName, lastName, email) => {
    return UserRep.findAllPagination(amount, page, firstName, lastName, email);
  };

  authorization = async req => {
    const checkLogin = true;

    let admin = false;

    admin = await UserRep.verifyRole(req.user.id, "administration");

    const authUser = {
      admin,
      checkLogin,
      logEmail: req.user.email
    };

    return authUser;
  };

  editNames = req => {
    return UserRep.editNames(
      req.body.firstName,
      req.body.lastName,
      req.user.email
    );
  };

  changePassword = (data, email) => {
    return UserRep.changePassword(data.prevPassword, data.newPassword, email);
  };

  deleteUser = id => {
    return UserRep.deleteUser(id);
  };

  createUser = data => {
    return UserRep.createUser(data);
  };

  addAdminService = id => {
    return UserRep.addRoleAdmin(id);
  };
  deleteAdminService = id => {
    return UserRep.deleteRoleAdmin(id);
  };
}
module.exports = new UserServices();
