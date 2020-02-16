const axios = require("axios");

const log = (req, res, next) => {
  const date = new Date().toString();

  const data = {
    headers: req.headers,
    httpVersion: req.httpVersion,
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    host: req.get("host"),
    body: req.body,
    startTime: req._startTime
  };

  axios
    .post(
      "http://loggingserver:3010/main/log",
      { date, data },
      { withCredentials: true }
    )
    .catch(e => console.log(e));

  next();
};

module.exports = { log };
