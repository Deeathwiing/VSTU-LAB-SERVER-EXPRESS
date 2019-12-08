const cryptoJs = require("crypto-js");
const { models } = require("../init/dataBaseUtils");

class Users {
  addRemoveRequest = req => {
    return models.User.addRemoveRequest(req.user.id);
  };

  verifyPassword = pass =>
    JSON.parse(
      cryptoJs.AES.decrypt(pass.toString(), process.env.SECRET_KEY).toString(
        cryptoJs.enc.Utf8
      )
    );
  listUsers = req => {
    return models.User.getAll();
  };

  authorization = async req => {
    const checkLogin = true;
    let admin = false;

    admin = await models.User.verifyRole(req.user.id, "administration");

    const authUser = {
      admin,
      checkLogin,
      logEmail: req.user.email
    };

    return authUser;
  };

  editNames = req => {
    return models.User.editNames(
      req.body.firstName,
      req.body.lastName,
      req.user.email
    );
  };

  deleteUser = id => {
    return models.User.deleteUser(id);
  };

  createUser = data => {
    return models.User.createUser(data);
  };

  addAdminService = id => {
    return models.User.addRoleAdmin(id)
      .then(() => 201)
      .catch(() => 409);
  };
  deleteAdminService = id => {
    return models.User.deleteRoleAdmin(id)
      .then(() => 201)
      .catch(() => 409);
  };
}
module.exports = new Users();
