const mongoose = require("mongoose");
const config = require("../../etc/config.js");
const Sequelize = require("sequelize");
require("./models");
const { initModels } = require("./models");
const { initRelations } = require("./relations.js");
const { initRep } = require("./repositories.js");

const sequelize = new Sequelize("omVapeShop", "root", "12345678", {
  host: "localhost",
  dialect: "mysql"
});

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
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
      )
    )
    .then(() =>
      console.log("Connection has been established successfully(mongo)")
    )
    .catch(err => console.log(err));
};

module.exports = { sequelize, models, setUpConnection };
