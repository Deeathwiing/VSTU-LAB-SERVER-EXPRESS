const axios = require("axios");

const errorHandler = (err, req, res, next) => {
  const date = new Date().toString();

  const data = JSON.stringify(err);

  axios
    .post(
      "http://loggingserver:3010/error/logError",
      { date, data },

      { withCredentials: true }
    )
    .catch(e => console.log(e));

  res.status(err.statusCode || 400).send({ message: err.message });
};

module.exports = { errorHandler };
