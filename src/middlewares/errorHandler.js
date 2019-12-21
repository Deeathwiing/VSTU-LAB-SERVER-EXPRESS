const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 400).send({ message: err.message });
};

module.exports = { errorHandler };
