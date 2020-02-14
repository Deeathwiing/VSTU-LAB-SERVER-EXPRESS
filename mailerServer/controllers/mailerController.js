const MailerService = require("../services/mailerService"),
  CustomError = require("../middlewares/customError");

class MailerController {
  sendMessage = async (req, res, next) => {
    try {
      MailerService.sendMessage(req.body.email, req.body.message)
        .then(() => res.status(201).send())
        .catch(err => next(err));
    } catch (e) {
      if (e instanceof CustomError) throw e;
      throw new CustomError(
        "error in MailerController.js",
        400,
        "Something wrong"
      );
    }
  };
}

module.exports = new MailerController();
