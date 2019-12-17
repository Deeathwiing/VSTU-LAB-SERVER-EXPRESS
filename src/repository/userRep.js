const cryptoJs = require("crypto-js");
const models = require("../init/models");
const sequelize = require("../init/sequelize");
const CustomError = require("../init/customError");

class UserRep {
  getAll = async () => {
    try {
      const users = await models.User.findAll({
        include: [{ model: models.Role }]
      });

      if (!users)
        throw new CustomError("getUsersError", 404, "Users not found");

      return users;
    } catch (e) {
      throw new CustomError(
        "getUsersError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };

  addRemoveRequest = async id => {
    try {
      const result = await models.User.update(
        { deleteAccountRequest: true },
        {
          where: {
            id
          }
        }
      );

      if (!result)
        throw new CustomError(
          "addRemoveError",
          404,
          "Bad request or problem with server,please stand by and try again"
        );
    } catch (e) {
      throw new CustomError(
        "addRemoveError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };

  verifyRole = async (id, typeOfRole) => {
    try {
      const parsingArrayRoles = (roles, typeOfRole) => {
        return roles.some(role => {
          if (role.dataValues.userRole === typeOfRole) {
            return true;
          }
          return false;
        });
      };

      let user = await models.User.findOne({ where: { id } });

      if (!user)
        throw new CustomError(
          "verifyRoleError",
          404,
          "verifyRole -> error -> user not found"
        );

      let roles = await user.getRoles();

      if (!roles)
        throw new CustomError(
          "verifyRoleError",
          404,
          "verifyRole -> error -> user roles not found"
        );

      let result = await parsingArrayRoles(roles, typeOfRole);

      return result;
    } catch (e) {
      throw new CustomError(
        "verifyRoleError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };

  createUser = async data => {
    try {
      const result = await models.User.findOne({
        where: {
          email: data.email
        }
      });

      if (result)
        throw new CustomError(
          "createUserError",
          409,
          "User with this email already exist"
        );

      if (!result) {
        let encryptedPass = cryptoJs.AES.encrypt(
          JSON.stringify(data.password),
          process.env.SECRET_KEY
        );

        encryptedPass = encryptedPass.toString();

        const user = await models.User.create({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: encryptedPass
        });

        if (!user)
          throw new CustomError("createUserError", 409, "User not created");

        const role = await models.Role.findOne({
          where: { userRole: "user" }
        });

        if (!role)
          throw new CustomError("createUserError", 409, "Role not added");

        const addRoleResult = await user.addRole(role);

        if (!addRoleResult)
          throw new CustomError("createUserError", 409, "Role not added");
      }
    } catch (e) {
      throw new CustomError(
        "createUserError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };

  addRoleAdmin = async id => {
    try {
      const user = await models.User.findOne({ where: { id } });

      if (!user)
        throw new CustomError("addRoleAdminError", 404, "User not found");

      const role = await models.Role.findOne({
        where: { userRole: "administration" }
      });

      if (!role)
        throw new CustomError("addRoleAdminError", 404, "Role not found");

      const result = user.setRoles(role);

      if (!result)
        throw new CustomError("addRoleAdminError", 404, "Role not added");
    } catch (e) {
      throw new CustomError(
        "addRoleAdminError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };

  deleteRoleAdmin = async id => {
    try {
      const amount = await sequelize.query(
        `Select count(roleId) from userroles Where roleId=(Select id from roles Where userRole="administration")`
      );

      console.log(amount);

      if (!amount)
        throw new CustomError(
          "deleteRoleAdminError",
          404,
          `Amount is ${typeof amount} `
        );

      if (amount[0][0]["count(roleId)"] > 1) {
        const user = await models.User.findOne({ where: { id } });

        if (!user)
          throw new CustomError("deleteRoleAdminError", 404, "User not found");

        const role = await models.Role.findOne({
          where: { userRole: "user" }
        });

        if (!role)
          throw new CustomError("deleteRoleAdminError", 404, "Role not found");

        const result = user.setRoles(role);

        if (!result)
          throw new CustomError(
            "deleteRoleAdminError",
            404,
            "Role not deleted"
          );
      }
      throw new CustomError(
        "deleteRoleAdminError",
        409,
        "Last admin, hold on to the end"
      );
    } catch (e) {
      throw new CustomError(
        "deleteRoleAdminError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };

  deleteUser = id => {
    try {
      const result = models.User.destroy({
        where: { id, deleteAccountRequest: true }
      });

      if (!result)
        throw new CustomError("deleteUserError", 404, "User not deleted");
    } catch (e) {
      throw new CustomError(
        "deleteUserError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };

  editNames = (firstName, lastName, email) => {
    try {
      if (!result)
        throw new CustomError("deleteUserError", 404, "User not deleted");

      const result = models.User.update(
        { firstName, lastName },
        { where: { email } }
      );
    } catch (e) {
      throw new CustomError(
        "editNamesError",
        400,
        "Bad request or problem with server,please stand by and try again"
      );
    }
  };
}
module.exports = new UserRep();
