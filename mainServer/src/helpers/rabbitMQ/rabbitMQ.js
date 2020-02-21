const rabbitLogger = require("./rabbitLogger");
const rabbitMailer = require("./rabbitMailer");

class RabbitMQ {
  async log(data) {
    await setTimeout(rabbitLogger.send, 1000 * 10, data);
  }

  async sendEmail(data) {
    await setTimeout(rabbitMailer.send, 1000 * 10, data);
  }
}

module.exports = new RabbitMQ();
