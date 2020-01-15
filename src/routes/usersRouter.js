const express = require("express");
const UsersController = require("../controllers/users");
const {
  authenticationAdminMiddleware,
  authenticationMiddleware
} = require("../middlewares/auth");

const usersRouter = express.Router();

usersRouter
  .get(
    "/getusers",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    UsersController.getUsers
  )

  .post("/create", UsersController.addUser)
  .delete(
    "/delete",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    UsersController.removeUser
  )
  .put("/editprofile", authenticationMiddleware, UsersController.editprofile)

  .put(
    "/removerequest",
    authenticationMiddleware,
    UsersController.removeRequest
  )

  .put(
    "/addadmin",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    UsersController.addAdmin
  )
  .put(
    "/deleteadmin",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    UsersController.deleteAdmin
  )
  .post("/authuser", UsersController.authuser);

module.exports = usersRouter;
