const logRep = require("../repository/logRepository");

class LogService {
  createLog = (date, data) => {
    return logRep.createLog(date, data);
  };
}

module.exports = new LogService();
