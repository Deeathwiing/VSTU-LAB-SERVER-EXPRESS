const CustomError = require("../init/customError");

const validate = (schema, validateData) => {
  if (schema) {
    const { error } = schema.validate(validateData);

    if (error) {
      throw new CustomError(
        "validateError",
        404,
        `${error.details[0].message}!`
      );
    }
  }
};

module.exports = objectOfValidation => (req, res, next) => {
  console.log(req.body);
  validate(objectOfValidation.body, req.body);
  validate(objectOfValidation.params, req.params);
  validate(objectOfValidation.query, req.query);

  next();
};
