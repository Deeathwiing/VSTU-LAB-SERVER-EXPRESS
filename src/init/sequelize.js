const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME_SQL,
  process.env.DB_USERNAME_SQL,
  process.env.DB_PASSWORD_SQL,
  {
    host: process.env.DB_HOST_SQL,
    dialect: "mysql"
  }
);

module.exports = sequelize;
