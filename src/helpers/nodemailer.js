const nodemailer = require("nodemailer"),
  config = require("./config");

class NodeMailer {
  async main(receiver, message) {
    console.log(receiver);
    console.log(config);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: config.email,
        pass: config.emailPassword
      }
    });

    let info = await transporter.sendMail({
      from: config.email,
      to: receiver.email,
      subject: "Simple e-shop account deletion notice",
      text: message
    });
  }
}
module.exports = new NodeMailer();
