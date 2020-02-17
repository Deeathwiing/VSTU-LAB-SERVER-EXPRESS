const rabbitMQ = require("./middlewares/rabbitMQ");

const connect = async () => {
  try {
    await rabbitMQ.consume();
  } catch (e) {
    console.log(e);
  }
};

connect();
