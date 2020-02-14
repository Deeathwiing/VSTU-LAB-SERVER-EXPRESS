const express = require("express"),
  config = require("./config"),
  connections = require("./src/init/connections"),
  AppLoader = require("./src/loaders/appLoader");

var app = express();

const connect = async () => {
  await connections.setUpConnection();
  await app.listen(config.loggingServerPort, () => {
    console.log(`Server run on port ${config.loggingServerPort}`);
  });
};

connect();

new AppLoader(app).init();

exports.app = app;
