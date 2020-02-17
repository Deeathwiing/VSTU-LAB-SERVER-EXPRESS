const rabbitLogger = require("../helpers/rabbitMQ/rabbitLogger");

const errorHandler = (err, req, res, next) => {
  const date = new Date().toString();

  const data = JSON.stringify(err);

  const message = { error: true, date, data };

  rabbitLogger.send(message);

  // axios
  //   .post(
  //     "http://loggingserver:3010/error/logError",
  //     { date, data },

  //     { withCredentials: true }
  //   )
  //   .catch(e => console.log(e));

  res.status(err.statusCode || 400).send({ message: err.message });
};

module.exports = { errorHandler };
