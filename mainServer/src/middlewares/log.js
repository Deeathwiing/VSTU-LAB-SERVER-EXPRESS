const rabbitLogger = require("../helpers/rabbitMQ/rabbitLogger");

const log = async (req, res, next) => {
  const date = new Date().toString();

  const data = {
    error: false,
    date,
    headers: req.headers,
    httpVersion: req.httpVersion,
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    host: req.get("host"),
    body: req.body,
    startTime: req._startTime
  };

  await rabbitLogger.send(data);
  // axios
  //   .post(
  //     "http://loggingserver:3010/main/log",
  //     { date, data },
  //     { withCredentials: true }
  //   )
  //   .catch(e => console.log(e));

  next();
};

module.exports = { log };
