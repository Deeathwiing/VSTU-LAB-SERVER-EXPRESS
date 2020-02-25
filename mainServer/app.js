const express = require("express"),
  db = require("./src/init/dataBaseUtils"),
  InitLoaders = require("./src/loaders/"),
  config = require("./config");

var app = express();

new InitLoaders(app).init();

const connect = async () => {
  await db.setUpConnection();

  await app.listen(config.serverPort, () => {
    console.log(`Server run on port ${config.serverPort}`);
  });
};

connect();

module.exports = app;
