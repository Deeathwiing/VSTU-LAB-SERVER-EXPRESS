import express from "express";
import bodyParser from "body-parser";
import { serverPort } from "./etc/config.json";
import * as db from "./repository/dataBaseUtils";
import cors from "cors";
import usersRouter from "./routes/usersRouter";
import itemsRouter from "./routes/itemsRouter";

db.setUpConnection();
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

const server = app.listen(serverPort, () => {
  console.log(`Server run on port ${serverPort}`);
});
