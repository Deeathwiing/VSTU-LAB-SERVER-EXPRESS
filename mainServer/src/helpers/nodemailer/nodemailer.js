const rabbitMailer = require("../rabbitMQ/rabbitMailer");

class NodeMailer {
  async main(receiver, message) {
    const data = { email: receiver.email, message };

    rabbitMailer.send(data);
  }
}
module.exports = new NodeMailer();
