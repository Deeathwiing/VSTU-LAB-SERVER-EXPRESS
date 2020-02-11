const axios = require("axios"),
  CustomError = require("../customError");

class NodeMailer {
  async main(receiver, message) {
    console.log(receiver);
    console.log(message);
    axios
      .post(
        "http://localhost:3006/main/sendemail",
        { email: receiver.email, message },
        { withCredentials: true }
      )
      .catch(e => {
        console.log(e);
        if (e instanceof CustomError) throw e;
        throw new CustomError(
          "error in nodemailer(axios)",
          400,
          "Something wrong"
        );
      });
  }
}
module.exports = new NodeMailer();
