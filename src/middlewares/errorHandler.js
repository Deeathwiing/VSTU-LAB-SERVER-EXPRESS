const axios = require("axios");

const errorHandler = (err, req, res, next) => {
  const date = new Date().toString();
  axios
    .post(
      "http://localhost:3010/error/logError",
      { date, data: JSON.stringify(err) },

      { withCredentials: true }
    )
    .catch(e => console.log(e));

  res.status(err.statusCode || 400).send({ message: err.message });
};

module.exports = { errorHandler };
