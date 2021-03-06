const cryptoJs = require("crypto-js"),
  models = require("../init/models"),
  sequelize = require("../init/sequelize"),
  CustomError = require("../helpers/customError"),
  nodemailer = require("../helpers/nodemailer/nodemailer"),
  config = require("../../config");

class UserRepository {
  findAllPagination = async (amount, page, firstName, lastName, email) => {
    try {
      let offset = Number(amount * (Math.floor(page) - 1));

      if (offset < 0) offset = 0;

      function WhereOptionsFunc(firstName, lastName, email) {
        if (email !== "none") this.email = email;

        if (firstName !== "none") this.firstName = firstName;

        if (lastName !== "none") this.lastName = lastName;
      }

      let whereOptions = new WhereOptionsFunc(firstName, lastName, email);

      whereOptions = JSON.parse(JSON.stringify(whereOptions));

      const users = await models.User.findAll({
        where: whereOptions,
        offset,
        limit: Number(amount),
        include: [{ model: models.Role }]
      });

      if (!users)
        throw new CustomError("getUsersError", 404, "Users not found");

      return users;
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
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
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
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
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
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
          config.secretKey
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
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
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
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  };

  deleteRoleAdmin = async id => {
    try {
      const amount = await sequelize.query(
        `Select count(roleId) from userroles Where roleId=(Select id from roles Where userRole="administration")`
      );

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
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  };

  deleteUser = async id => {
    try {
      const user = await models.User.findOne({
        where: { id, deleteAccountRequest: true }
      });

      const result = await models.User.destroy({
        where: { id, deleteAccountRequest: true }
      });

      if (!result)
        throw new CustomError("deleteUserError", 404, "User not deleted");

      nodemailer.main(user.dataValues, "Hi, your account has been deleted.");
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  };

  verifyPassword = pass =>
    JSON.parse(
      cryptoJs.AES.decrypt(pass.toString(), process.env.SECRET_KEY).toString(
        cryptoJs.enc.Utf8
      )
    );

  editNames = async (firstName, lastName, email) => {
    try {
      const result = await models.User.update(
        { firstName, lastName },

        { where: { email } }
      );

      if (!result)
        throw new CustomError("deleteUserError", 404, "User not deleted");

      return result;
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  };

  changePassword = async (prevPassword, newPassword, email) => {
    try {
      const user = await models.User.findOne({ where: { email } });

      if (!user)
        throw new CustomError("change password error", 404, "User not found");

      if (this.verifyPassword(user.password) == prevPassword) {
        let encryptedPass = cryptoJs.AES.encrypt(
          JSON.stringify(data.password),
          config.secretKey
        );

        encryptedPass = encryptedPass.toString();

        const result = await models.User.update(
          { password: encryptedPass },

          { where: { email } }
        );

        if (!result)
          throw new CustomError("deleteUserError", 404, "User not deleted");

        return result;
      }
      throw new CustomError(
        "change password error",
        404,
        "Wrong previous password"
      );
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  };
}

module.exports = new UserRepository();
