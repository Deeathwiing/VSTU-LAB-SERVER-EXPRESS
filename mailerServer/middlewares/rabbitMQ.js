const amqp = require("amqplib/callback_api"),
  customError = require("./customError"),
  mailerService = require("../services/mailerService"),
  queue = "mailer";

class RabbitLogger {
  async consume() {
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

          channel.consume(
            queue,
            function(msg) {
              const message = JSON.parse(msg.content.toString());
              mailerService.sendMessage(message.email, message.message);
            },
            {
              noAck: true
            }
          );
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
