import express from "express";
import * as usersController from "../controllers/users";
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
usersRouter.use("/addadmin/:id", checkAdmin, usersController.addAdmin);
usersRouter.use("/deleteadmin/:id", checkAdmin, usersController.deleteAdmin);

export default usersRouter;
