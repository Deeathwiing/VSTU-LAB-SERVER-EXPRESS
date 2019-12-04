const express = require("express");
const db = require("./src/init/dataBaseUtils");
const Router = require("./src/loaders/router.js");
const AppLoader = require("./src/loaders/appLoader");
const PassportLoader = require("./src/loaders/passport");

var app = express();

require("./src/middlewares/passport");

new Router(app).init();

new AppLoader(app).init();

new PassportLoader(app).init();

const connect = async () => {
  await db.setUpConnection();
  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server run on port ${process.env.SERVER_PORT}`);
  });
};

connect();

module.exports = app;
