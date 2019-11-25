import express from "express";

import { serverPort } from "./etc/config.json";
import * as db from "./init/dataBaseUtils";
import usersRouter from "./routes/usersRouter";
import itemsRouter from "./routes/itemsRouter";
import { appMiddlewares } from "./middlewares/appMiddlewares";

db.setUpConnection();

var app = express();

appMiddlewares(app);

import "./etc/passport";

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

const server = app.listen(serverPort, () => {
  console.log(`Server run on port ${serverPort}`);
});

module.exports = app;
