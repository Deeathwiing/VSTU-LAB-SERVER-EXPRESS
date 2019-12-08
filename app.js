const express = require("express");
const db = require("./src/init/dataBaseUtils");
const InitLoaders = require("./src/loaders/");
const PassportMid = require("./src/middlewares/passport");

//const Rating322 = require("./src/models/test.js");

var app = express();

new InitLoaders(app).init();

new PassportMid().init();

const connect = async () => {
  //console.log(db.sequelize);
  await db.setUpConnection();
  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server run on port ${process.env.SERVER_PORT}`);
  });
};

connect();

exports.app = app;
