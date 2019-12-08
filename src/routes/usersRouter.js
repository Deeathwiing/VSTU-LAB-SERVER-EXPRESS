const express = require("express");
const UsersController = require("../controllers/users");
const Auth = require("../middlewares/auth");

const usersRouter = express.Router();

usersRouter.use(
  "/getusers",
  Auth.authenticationMiddleware,
  Auth.authenticationAdminMiddleware,
  UsersController.getUsers
);
usersRouter.use("/create", UsersController.addUser);
usersRouter.use(
  "/delete/:id",
  Auth.authenticationMiddleware,
  Auth.authenticationAdminMiddleware,
  UsersController.removeUser
);
usersRouter.use(
  "/removerequest",
  Auth.authenticationMiddleware,
  UsersController.removeRequest
);
usersRouter.use(
  "/editprofile",
  Auth.authenticationMiddleware,
  UsersController.editprofile
);
usersRouter.use("/authuser", UsersController.authuser);
usersRouter.use(
  "/addadmin/:id",
  Auth.authenticationMiddleware,
  Auth.authenticationAdminMiddleware,
  UsersController.addAdmin
);
usersRouter.use(
  "/deleteadmin/:id",
  Auth.authenticationMiddleware,
  Auth.authenticationAdminMiddleware,
  UsersController.deleteAdmin
);

module.exports = usersRouter;
