const sequelize = require("../init/sequelize");
const Sequelize = require("sequelize");

const RoleModel = sequelize.define("role", {
  userRole: {
    type: Sequelize.STRING
  }
});

module.exports = RoleModel;
