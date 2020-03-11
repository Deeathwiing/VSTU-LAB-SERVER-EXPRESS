const CustomError = require("../helpers/customError");

const validate = async (schema, validateData) => {
  if (schema) {
    const { error } = await schema.validate(validateData);

    if (error) {
      throw new CustomError("validateError", 400, `Error with Validation!`);
    }
  }
};

module.exports = objectOfValidation => async (req, res, next) => {
  try {
    await validate(objectOfValidation.body, req.body);

    await validate(objectOfValidation.params, req.params);

    await validate(objectOfValidation.query, req.query);

    next();
  } catch (e) {
    next(e);
  }
};
