const logModel = require("../models/logSchema").Log,
  CustomError = require("../middlewares/customError");

class LogRepository {
  createLog = async (date, data) => {
    try {
      const message = JSON.stringify(data);

      const newLog = new logModel({ date, message });

      const result = await newLog.save();

      if (!result)
        throw new CustomError(
          "error in logRepository.js",
          400,
          "Something wrong"
        );
    } catch (e) {
      if (e instanceof CustomError) throw e;
      throw new CustomError(
        "error in logRepository.js",
        400,
        "Something wrong"
      );
    }
  };
}

module.exports = new LogRepository();
