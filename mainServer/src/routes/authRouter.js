const express = require("express"),
  UsersController = require("../controllers/users"),
  authRouter = express.Router(),
  validator = require("../middlewares/validator(joi)"),
  schemas = require("../validationSchemas/schemas");

authRouter
  .post(
    "/create",
    validator({ body: schemas.registration }),
    UsersController.addUser
  )
  .post(
    "/authuser",
    validator({ body: schemas.login }),
    UsersController.authuser
  );

module.exports = authRouter;
