const rabbitMQ = require("./src/middlewares/rabbitMQ"),
  connections = require("./src/init/connections");

const connect = async () => {
  try {
    await connections.setUpConnection();
    await rabbitMQ.consume();
  } catch (e) {
    console.log(e);
  }
};

connect();
