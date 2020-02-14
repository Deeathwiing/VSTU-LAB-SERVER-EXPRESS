const mongoose = require("mongoose"),
  config = require("../../config");

const setUpConnection = () => {
  mongoose
    .connect(
      `mongodb://${config.mongoHost}:${config.mongoPort}/${config.mongoName}`
    )
    .then(() =>
      console.log("Connection has been established successfully(mongo)")
    )
    .catch(err => console.log(err));
};

module.exports = { setUpConnection };
