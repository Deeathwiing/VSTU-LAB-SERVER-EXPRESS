const CustomError = require("../helpers/customError");

const validate = async (schema, validateData) => {
  if (schema) {
    const { error } = await schema.validate(validateData);

    if (error) {
      throw new CustomError("validateError", 404, `Error with Validation!`);
    }
  }
};

module.exports = objectOfValidation => async (req, res, next) => {
  await validate(objectOfValidation.body, req.body);

  await validate(objectOfValidation.params, req.params);

  await validate(objectOfValidation.query, req.query);

  // if (req.hasOwnProperty("file")) {
  //   console.log(req.file);
  //   await validate(objectOfValidation.file, req.file.buffer);
  // }

  next();
};
