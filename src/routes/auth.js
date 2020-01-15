const express = require("express");
const UsersController = require("../controllers/users");
const {
  authenticationAdminMiddleware,
  authenticationMiddleware
} = require("../middlewares/auth");

const authRouter = express.Router();

authRouter
  .post("/create", UsersController.addUser)
  .post("/authuser", UsersController.authuser);

module.exports = authRouter;
