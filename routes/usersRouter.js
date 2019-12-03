const express = require("express");
const usersController = require("../controllers/users");
const {
  authenticationMiddleware,
  authenticationAdminMiddleware
} = require("../middlewares/passportMiddleWares");

const usersRouter = express.Router();

usersRouter.use(
  "/getusers",
  authenticationAdminMiddleware,
  usersController.getUsers
);
usersRouter.use("/create", usersController.addUser);
usersRouter.use(
  "/delete/:id",
  authenticationAdminMiddleware,
  usersController.removeUser
);
usersRouter.use(
  "/removerequest",
  authenticationMiddleware,
  usersController.removeRequest
);
usersRouter.use(
  "/editprofile",
  authenticationMiddleware,
  usersController.editprofile
);
usersRouter.use("/authuser", usersController.authuser);
usersRouter.use(
  "/addadmin/:id",
  authenticationAdminMiddleware,
  usersController.addAdmin
);
usersRouter.use(
  "/deleteadmin/:id",
  authenticationAdminMiddleware,
  usersController.deleteAdmin
);

module.exports = usersRouter;
