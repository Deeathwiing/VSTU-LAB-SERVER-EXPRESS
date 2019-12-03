const express = require("express");
const config = require("./etc/config.js");
const db = require("./init/dataBaseUtils");
const usersRouter = require("./routes/usersRouter");
const { appMiddleWares } = require("./middlewares/appMiddlewares");
const productsRouter = require("./routes/productsRouter.js");

//const Rating require( "./bugs";

db.setUpConnection();

var app = express();

appMiddleWares(app);

require("./middlewares/passport");

app.use("/users", usersRouter);
app.use("/items", productsRouter);

const server = app.listen(config.serverPort, () => {
  console.log(`Server run on port ${config.serverPort}`);
});

module.exports = app;
