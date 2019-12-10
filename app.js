const express = require("express");
const db = require("./src/init/dataBaseUtils");
const InitLoaders = require("./src/loaders/");
const PassportMid = require("./src/middlewares/passport");

var app = express();

new InitLoaders(app).init();

const connect = async () => {
  await db.setUpConnection();
  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server run on port ${process.env.SERVER_PORT}`);
  });
};

connect();

exports.app = app;
