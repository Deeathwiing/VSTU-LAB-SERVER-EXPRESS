const sequelize = require("../init/sequelize"),
  Sequelize = require("sequelize");

const UserModel = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    Unique: true
  },

  deleteAccountRequest: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = UserModel;
