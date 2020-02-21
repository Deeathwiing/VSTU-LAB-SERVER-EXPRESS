const rabbitMQ = require("../rabbitMQ/rabbitMQ");

class NodeMailer {
  async main(receiver, message) {
    const data = { email: receiver.email, message };

    rabbitMQ.sendEmail(data);
  }
}
module.exports = new NodeMailer();
