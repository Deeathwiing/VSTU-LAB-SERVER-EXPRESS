const cryptoJs = require("crypto-js");
const { models } = require("../init/dataBaseUtils");

const addRemoveRequest = req => {
  return models.User.addRemoveRequest(req.user.id);
};

const verifyPassword = pass =>
  JSON.parse(
    cryptoJs.AES.decrypt(pass.toString(), "It's easy 322").toString(
      cryptoJs.enc.Utf8
    )
  );
const listUsers = req => {
  return models.User.getAll();
};

const authorization = async req => {
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

const editNames = req => {
  return models.User.editNames(
    req.body.firstName,
    req.body.lastName,
    req.user.email
  );
};

const deleteUser = id => {
  return models.User.deleteUser(id);
};

const createUser = data => {
  return models.User.createUser(data);
};

const addAdminService = id => {
  return models.User.addRoleAdmin(id)
    .then(() => 201)
    .catch(() => 409);
};
const deleteAdminService = id => {
  return models.User.deleteRoleAdmin(id)
    .then(() => 201)
    .catch(() => 409);
};

module.exports = {
  createUser,
  deleteUser,
  editNames,
  authorization,
  listUsers,
  verifyPassword,
  addRemoveRequest,
  addAdminService,
  deleteAdminService
};
