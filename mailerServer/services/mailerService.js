const nodemailer = require("nodemailer"),
  config = require("../config");

class MailerService {
  async sendMessage(email, message) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.email,
        pass: config.emailPassword
      }
    });

    let info = await transporter.sendMail({
      from: config.email,
      to: email,
      subject: "Simple e-shop account deletion notice",
      text: message
    });

    return info;
  }
}

module.exports = new MailerService();
