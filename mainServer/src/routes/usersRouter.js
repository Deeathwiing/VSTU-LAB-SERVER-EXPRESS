const express = require("express"),
  UsersController = require("../controllers/users"),
  {
    authenticationAdminMiddleware,
    authenticationMiddleware
  } = require("../middlewares/auth"),
  usersRouter = express.Router(),
  validator = require("../middlewares/validator(joi)"),
  schemas = require("../validationSchemas/schemas");

usersRouter
  .get(
    "/getusers",

    validator({ query: schemas.getUsers }),

    authenticationMiddleware,

    authenticationAdminMiddleware,

    UsersController.getUsers
  )

  .delete(
    "/delete",

    validator({ query: schemas.checkId }),

    authenticationMiddleware,

    authenticationAdminMiddleware,

    UsersController.removeUser
  )
  .put(
    "/editprofile",

    validator({ body: schemas.updateProfile }),

    authenticationMiddleware,

    UsersController.editprofile
  )

  .put(
    "/removerequest",

    authenticationMiddleware,

    UsersController.removeRequest
  )

  .put(
    "/addadmin",

    validator({ query: schemas.checkId }),

    authenticationMiddleware,

    authenticationAdminMiddleware,

    UsersController.addAdmin
  )
  .put(
    "/deleteadmin",

    validator({ query: schemas.checkId }),

    authenticationMiddleware,

    authenticationAdminMiddleware,

    UsersController.deleteAdmin
  )
  .put(
    "/changePassword",

    validator({ body: schemas.changePassword }),

    authenticationMiddleware,

    UsersController.changePassword
  );

module.exports = usersRouter;
