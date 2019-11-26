import express from "express";
import { serverPort } from "./etc/config.json";
import * as db from "./init/dataBaseUtils";
import usersRouter from "./routes/usersRouter";
import { appMiddlewares } from "./middlewares/appMiddlewares";
import productsRouter from "./routes/productsRouter.js";

db.setUpConnection();

var app = express();

appMiddlewares(app);

import "./middlewares/passport";

app.use("/users", usersRouter);
app.use("/items", productsRouter);

const server = app.listen(serverPort, () => {
  console.log(`Server run on port ${serverPort}`);
});

module.exports = app;
