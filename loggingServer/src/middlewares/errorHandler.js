const logErrorService = require("../services/logErrorService");

const errorHandler = (err, req, res, next) => {
  logErrorService.createLog(new Date(), JSON.stringify(err));

  res.status(err.statusCode || 400).send({ message: err.message });
};

module.exports = { errorHandler };
