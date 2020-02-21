const rabbitMQ = require("./src/middlewares/rabbitMQ"),
  connections = require("./src/init/connections");

const connect = async () => {
  try {
    await connections.setUpConnection();
    setTimeout(rabbitMQ.consume, 1000 * 10);
  } catch (e) {
    console.log(e);
  }
};

connect();
