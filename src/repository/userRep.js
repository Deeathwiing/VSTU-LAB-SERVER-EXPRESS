const cryptoJs = require("crypto-js");

const initUserRep = (models, sequelize) => {
  models.User.getAll = () => {
    return models.User.findAll({ include: [{ model: models.Role }] });
  };

  models.User.addRemoveRequest = id => {
    return models.User.update(
      { deleteAccountRequest: true },
      {
        where: {
          id
        }
      }
    )
      .then(() => 201)
      .catch(() => 409);
  };

  models.User.verifyRole = async (id, typeOfRole) => {
    const parsingArrayRoles = (roles, typeOfRole) => {
      return roles.some(role => {
        if (role.dataValues.userRole === typeOfRole) {
          return true;
        }
        return false;
      });
    };
    let result = await models.User.findOne({ where: { id } })
      .then(user => user.getRoles())
      .then(roles => parsingArrayRoles(roles, typeOfRole));
    return result;
  };

  models.User.createUser = async data => {
    const result = await models.User.findOne({
      where: {
        email: data.email
      }
    });
    if (result == null) {
      let encryptedPass = cryptoJs.AES.encrypt(
        JSON.stringify(data.password),
        process.env.SECRET_KEY
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

  models.User.addRoleAdmin = async id => {
    console.log(id);
    const user = await models.User.findOne({ where: { id } });
    const role = await models.Role.findOne({
      where: { userRole: "administration" }
    });
    user.setRoles(role);
  };

  models.User.deleteRoleAdmin = async id => {
    const amount = await sequelize
      .query(
        `Select count(roleId) from userroles Where roleId=(Select id from roles Where userRole="administration")`
      )
      .then(count => count);
    if (amount[0][0]["count(roleId)"] > 1) {
      const user = await models.User.findOne({ where: { id } });
      const role = await models.Role.findOne({
        where: { userRole: "user" }
      });
      return user.setRoles(role);
    } else return new Error("Last admin");
  };

  models.User.deleteUser = id => {
    return models.User.destroy({ where: { id, deleteAccountRequest: true } })
      .then(() => 201)
      .catch(() => 409);
  };

  models.User.editNames = (firstName, lastName, email) => {
    return models.User.update({ firstName, lastName }, { where: { email } })
      .then(() => 201)
      .catch(() => 409);
  };
};

module.exports = { initUserRep };
