import express from "express";
import bodyParser from "body-parser";
import { serverPort } from "./etc/config.json";
import * as db from "./repository/dataBaseUtils";
import cors from "cors";
import usersRouter from "./routes/usersRouter";
import itemsRouter from "./routes/itemsRouter";
import passport from "passport";
import serveStatic from "serve-static";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";

import User from "./models/user";

db.setUpConnection();
const app = express();

app.use(serveStatic("public"));

app.use(cookieParser());

app.use(bodyParser());

app.use(
  session({
    secret: "Its 322",
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
    resave: false,
    saveUninitialized: false
  })
);

app.use(morgan("combined"));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(passport.initialize());

app.use(passport.session());

import "./etc/passport";

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

const server = app.listen(serverPort, () => {
  console.log(`Server run on port ${serverPort}`);
});
