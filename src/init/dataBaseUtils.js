const mongoose = require("mongoose");
const { initRelations } = require("./relations.js");
const { initRep } = require("./repositories.js");
const sequelize = require("./sequelize");

initRelations();
initRep();

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

module.exports = { setUpConnection };
