const passportSocketIo = require("passport.socketio"),
  sessionStore = require("../loaders/redisStore"),
  socketIo = require("socket.io"),
  config = require("../../config");

class Chat {
  constructor(server) {
    this.server = server;
  }
  init = () => {
    const io = socketIo(this.server);
    io.use(
      passportSocketIo.authorize({
        cookieParser: require("cookie-parser"),
        key: "express.sid",
        secret: config.secret,
        store: sessionStore,
      })
    );

    io.on("connection", function (client) {
      console.log("Connect");
      client.on("new message", (data) => {
        io.emit("new message", {
          author: `${client.request.user.firstName} ${client.request.user.lastName}`,
          message: data,
        });
      });
    });
  };
}

module.exports = Chat;
