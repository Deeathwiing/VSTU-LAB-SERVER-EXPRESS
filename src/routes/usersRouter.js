const express = require("express");
const UsersController = require("../controllers/users");
const {
  authenticationAdminMiddleware,
  authenticationMiddleware
} = require("../middlewares/auth");

const usersRouter = express.Router();

usersRouter.use(
  "/getusers",
  authenticationMiddleware,
  authenticationAdminMiddleware,
  UsersController.getUsers
);
usersRouter.use("/create", UsersController.addUser);
usersRouter.use(
  "/delete/:id",
  authenticationMiddleware,
  authenticationAdminMiddleware,
  UsersController.removeUser
);
usersRouter.use(
  "/removerequest",
  authenticationMiddleware,
  UsersController.removeRequest
);
usersRouter.use(
  "/editprofile",
  authenticationMiddleware,
  UsersController.editprofile
);
usersRouter.use("/authuser", UsersController.authuser);
usersRouter.use(
  "/addadmin/:id",
  authenticationMiddleware,
  authenticationAdminMiddleware,
  UsersController.addAdmin
);
usersRouter.use(
  "/deleteadmin/:id",
  authenticationMiddleware,
  authenticationAdminMiddleware,
  UsersController.deleteAdmin
);

module.exports = usersRouter;
