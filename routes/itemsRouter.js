import express from "express";
import * as itemsController from "../controllers/itemsController.js";
import {
  authenticationMiddleware as checkAuth,
  authenticationAdminMiddleware as checkAdmin
} from "../middlewares/passportMiddleWares";

const usersRouter = express.Router();

usersRouter.use("/getitems/:amount", itemsController.getItems);
usersRouter.use("/create", checkAdmin, itemsController.addItem);
usersRouter.use("/update", checkAdmin, itemsController.updateItem);
usersRouter.use("/delete/:id", checkAdmin, itemsController.deleteItem);
usersRouter.use("/rating", checkAuth, itemsController.rating);

export default usersRouter;
