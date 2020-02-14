const logErrorRep = require("../repository/logErrorRepository");

class LogErrorService {
  createLog = (date, err) => {
    return logErrorRep.createLogError(date, err);
  };
}

module.exports = new LogErrorService();
