import express from "express";
import * as usersController from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.use("/getusers", usersController.getUsers);
usersRouter.use("/create", usersController.addUser);
usersRouter.use("/delete/:id", usersController.removeUser);
usersRouter.use("/removerequest", usersController.removeRequest);
usersRouter.use("/editprofile", usersController.editprofile);
usersRouter.use("/authuser", usersController.authuser);

export default usersRouter;
