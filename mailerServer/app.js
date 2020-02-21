const rabbitMQ = require("./middlewares/rabbitMQ");

const connect = async () => {
  try {
    setTimeout(rabbitMQ.consume, 1000 * 10);
  } catch (e) {
    console.log(e);
  }
};

connect();
