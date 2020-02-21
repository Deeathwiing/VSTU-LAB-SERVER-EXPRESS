class CustomError extends Error {
  constructor(name, statusCode, message) {
    super(message);
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
