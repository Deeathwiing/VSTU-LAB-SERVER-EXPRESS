const logService = require("../services/logService"),
  CustomError = require("../middlewares/customError");

class LogController {
  createLog = async (req, res, next) => {
    try {
      logService
        .createLog(req.body.date, req.body.data)
        .then(() => res.status(201).send())
        .catch(err => next(err));
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError(
        "error in logController.js",
        400,
        "Something wrong"
      );
    }
  };
}

module.exports = new LogController();
