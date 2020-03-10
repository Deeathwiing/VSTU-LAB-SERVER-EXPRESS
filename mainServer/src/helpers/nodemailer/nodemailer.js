const rabbitMQ = require("../rabbitMQ/rabbitMQ");

class NodeMailer {
  async main(receiver, message) {
    const data = { email: receiver.email, message };

    const result = rabbitMQ.sendEmail(data);
    if (result)
      throw new CustomError("send email error", 400, "Email dont send");
  }
}
module.exports = new NodeMailer();
