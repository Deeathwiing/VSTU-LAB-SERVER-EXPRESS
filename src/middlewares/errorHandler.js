const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 400).send({ message: err.message });
};

module.exports = { errorHandler };
