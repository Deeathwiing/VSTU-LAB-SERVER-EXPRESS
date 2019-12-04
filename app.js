const express = require("express");
const config = require("./etc/config.js");
const db = require("./src/init/dataBaseUtils");
const { appMiddleWares } = require("./src/middlewares/appMiddlewares");
const Router = require("./src/loaders/router.js");

//const Rating require( "./bugs";

var app = express();

appMiddleWares(app);

require("./src/middlewares/passport");

new Router(app).init();

const connect = async () => {
  await db.setUpConnection();
  await app.listen(config.serverPort, () => {
    console.log(`Server run on port ${config.serverPort}`);
  });
};
connect();

module.exports = app;
