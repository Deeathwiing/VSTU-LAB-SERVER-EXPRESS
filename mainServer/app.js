const express = require("express");
const db = require("./src/init/dataBaseUtils");
const InitLoaders = require("./src/loaders/");
const config = require("./config");

var app = express();

new InitLoaders(app).init();

const connect = async () => {
  await db.setUpConnection();
  await app.listen(config.serverPort, () => {
    console.log(`Server run on port ${config.serverPort}`);
  });
};

connect();

exports.app = app;
