import express from "express";
import bodyParser from "body-parser";
import { serverPort } from "./etc/config.json";
import * as db from "./utils/dataBaseUtils";
import cors from "cors";

db.setUpConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get("/items", (req, res) => {
  db.listItems().then(data => res.send(data));
});

app.post("/items", (req, res) => {
  db.createItem(req.body).then(data => res.send(data));
});

app.post("/rating", (req, res) => {
  db.addRating(req.body).then(data => res.send(data));
});

app.delete("/items/:id", (req, res) => {
  db.deleteItem(req.params.id).then(data => res.send(data));
});

app.get("/users", (req, res) => {
  db.listUsers().then(data => res.send(data));
});

app.post("/users", (req, res) => {
  db.createUser(req.body).then(data => res.send(data));
});

app.delete("/users/:id", (req, res) => {
  db.deleteUser(req.params.id).then(data => res.send(data));
});

app.post("/authUser", (req, res) => {
  db.authorization(req.body).then(data => res.send(data));
});

app.get("/authUser", (req, res) => {
  db.getAuthUser().then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
  console.log(`Server run on port ${serverPort}`);
});
