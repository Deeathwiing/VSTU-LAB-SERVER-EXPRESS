const express = require("express"),
  db = require("./src/init/dataBaseUtils"),
  InitLoaders = require("./src/loaders/"),
  config = require("./config"),
  http = require("http");

var app = express();

const server = http.createServer(app);
const io = require("socket.io")(server);

new InitLoaders(app).init();

const connect = async () => {
  await db.setUpConnection();

  await server.listen(config.serverPort, () => {
    console.log(`Server run on port ${config.serverPort}`);
  });
};

io.on("connection", function (client) {
  console.log(result);
  client.on("new message", (data) => {
    console.log("MSG: ", data);
    io.emit("new message", { author: "Operkit", message: data });
  });
});

connect();

module.exports = app;
