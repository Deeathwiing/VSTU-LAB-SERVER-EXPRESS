import express from "express";
import bodyParser from "body-parser";
import * as db from "./utils/dataBaseUtils";

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.get("/items", (req, res) => {
  db.listItems().then(data => res.send(data));
});

app.post("/items", (req, res) => {
  db.createItem(req, body).then(data => res.send(data));
});

app.delete("/items/:id", (req, res) => {
  db.deleteItem(req.params.id).then(data => res.send(data));
});

app.get("/users", (req, res) => {
  db.listUsers().then(data => res.send(data));
});

app.post("/users", (req, res) => {
  db.createUser(req, body).then(data => res.send(data));
});

app.delete("/users/:id", (req, res) => {
  db.deleteUser(req.params.id).then(data => res.send(data));
});

const server = app.listen(3001, () => {
  console.log("OK");
});
