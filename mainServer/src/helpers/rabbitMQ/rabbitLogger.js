const amqp = require("amqplib/callback_api"),
  customError = require("../customError"),
  queue = "logger";

class RabbitLogger {
  async send(message) {
    try {
      await amqp.connect("amqp://rabbitmq", function(error0, connection) {
        if (error0) {
          throw new customError(
            "error in connect to amqp",
            401,
            "error in connect to amqp"
          );
        }
        connection.createChannel(function(error1, channel) {
          if (error1) {
            throw new customError(
              "error in createChannel(amqp)",
              401,
              "error in createChannel(amqp)"
            );
          }

          channel.assertQueue(queue, {
            durable: false
          });

          channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        });
      });
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError(
        "undefined error with rabbitLogger",
        400,
        "Something wrong"
      );
    }
  }
}

module.exports = new RabbitLogger();
