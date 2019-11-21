import express from "express";
import * as usersController from "../controllers/usersController";
import {
  authenticationMiddleware as checkAuth,
  authenticationAdminMiddleware as checkAdmin
} from "../middlewares/passportMiddleWares";

const usersRouter = express.Router();

usersRouter.use("/getusers", checkAdmin, usersController.getUsers);
usersRouter.use("/create", usersController.addUser);
usersRouter.use("/delete/:id", checkAdmin, usersController.removeUser);
usersRouter.use("/removerequest", checkAuth, usersController.removeRequest);
usersRouter.use("/editprofile", checkAuth, usersController.editprofile);
usersRouter.use("/authuser", usersController.authuser);

export default usersRouter;
