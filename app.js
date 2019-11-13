import express from "express";
import bodyParser from "body-parser";
import { serverPort } from "./etc/config.json";
import * as db from "./utils/dataBaseUtils";
import cors from "cors";

db.setUpConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get("/items/:amount", (req, res) => {
  db.listItems(req.params.amount).then(data => {
    res.send(data);
  });
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

app
  .get("/users", (req, res) => {
    db.listUsers().then(data => res.send(data));
  })
  .post("/users", (req, res) => {
    db.createUser(req.body).then(data => {
      return res.sendStatus(data);
    });
  });

app.delete("/users/:id", (req, res) => {
  db.deleteUser(req.params.id).then(data => {
    return res.sendStatus(data);
  });
});

app.post("/removeRequest", (req, res) => {
  db.removeRequest(req.body).then(data => res.sendStatus(data));
});

app.post("/editNames", (req, res) => {
  db.editNames(req.body).then(data => res.sendStatus(data));
});

app.post("/authUser", (req, res) => {
  db.authorization(req.body).then(data => {
    return res.send(data);
  });
});

const server = app.listen(serverPort, () => {
  console.log(`Server run on port ${serverPort}`);
});
