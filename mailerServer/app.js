const express = require("express"),
  config = require("./config"),
  AppLoader = require("./loaders/appLoader");

var app = express();

const connect = async () => {
  await app.listen(config.mailerServerPort, () => {
    console.log(`Server run on port ${config.mailerServerPort}`);
  });
};

connect();

new AppLoader(app).init();

exports.app = app;
