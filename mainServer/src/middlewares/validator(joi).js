const CustomError = require("../helpers/customError");

const validate = (schema, validateData) => {
  console.log(validateData);
  if (schema) {
    const { error } = schema.validate(validateData);

    if (error) {
      console.log(error);
      throw new CustomError("validateError", 404, `Error with Validation!`);
    }
  }
};

module.exports = objectOfValidation => (req, res, next) => {
  validate(objectOfValidation.body, req.body);

  validate(objectOfValidation.params, req.params);

  validate(objectOfValidation.query, req.query);

  next();
};
