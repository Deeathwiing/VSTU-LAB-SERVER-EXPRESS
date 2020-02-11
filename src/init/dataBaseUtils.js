const mongoose = require("mongoose"),
  { initRelations } = require("./relations.js"),
  sequelize = require("./sequelize"),
  config = require("../../config");

initRelations();

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
    );
};

module.exports = { setUpConnection };
