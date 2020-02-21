const rabbitMQ = require("../helpers/rabbitMQ/rabbitMQ");

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

  rabbitMQ.log(data);

  next();
};

module.exports = { log };
