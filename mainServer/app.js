const express = require("express"),
  db = require("./src/init/dataBaseUtils"),
  InitLoaders = require("./src/loaders/"),
  config = require("./config"),
  http = require("http"),
  Chat = require("./src/chat/chat");

var app = express();

const server = http.createServer(app);

new InitLoaders(app).init();

const connect = async () => {
  await db.setUpConnection();

  await server.listen(config.serverPort, () => {
    console.log(`Server run on port ${config.serverPort}`);
  });

  await new Chat(server).init();
};

connect();

module.exports = server;
