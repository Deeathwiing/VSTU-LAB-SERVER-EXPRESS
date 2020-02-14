const Sequelize = require("sequelize"),
  config = require("../../config");

const sequelize = new Sequelize(
  config.dbNameSQL,
  config.usernameSQL,
  config.passwordSQL,
  {
    host: config.hostSQL,
    dialect: "mysql"
  }
);

module.exports = sequelize;
