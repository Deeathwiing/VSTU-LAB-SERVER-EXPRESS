const logModelError = require("../models/logSchema").Error;

class LogErrorRepository {
  createLogError = async (date, err) => {
    try {
      const message = JSON.stringify(err);

      const newLog = new logModelError({ date, message });

      const result = await newLog.save();

      if (!result)
        throw new CustomError(
          "error in logErrorRepository.js",
          400,
          "Something wrong"
        );
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError(
        "error in logErrorRepository.js",
        400,
        "Something wrong"
      );
    }
  };
}

module.exports = new LogErrorRepository();
