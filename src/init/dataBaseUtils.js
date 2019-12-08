const mongoose = require("mongoose");
const Sequelize = require("sequelize");
require("./models");
const { initModels } = require("./models");
const { initRelations } = require("./relations.js");
const { initRep } = require("./repositories.js");

// const sequelize = async () =>
//   await new Sequelize(
//     process.env.DB_NAME_SQL,
//     process.env.DB_USERNAME_SQL,
//     process.env.DB_PASSWORD_SQL,
//     {
//       host: process.env.DB_HOST_SQL,
//       dialect: "mysql"
//     }
//   );

const sequelize = require("./sequelize");

const models = initModels(sequelize, Sequelize);
initRelations(models);
initRep(models, sequelize);

const setUpConnection = () => {
  return sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully(sql).");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    })
    .then(
      sequelize.sync().then(result => {
        console.log("Run");
      })
    )
    .then(
      mongoose.connect(
        `mongodb://${process.env.DB_HOST_MONGO}:${process.env.DB_PORT_MONGO}/${process.env.DB_NAME_MONGO}`
      )
    )
    .then(() =>
      console.log("Connection has been established successfully(mongo)")
    )
    .catch(err => console.log(err));
};

module.exports = { sequelize, models, setUpConnection };
