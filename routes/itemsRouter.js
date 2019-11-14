import express from "express";
import * as itemsController from "../controllers/itemsController";

const usersRouter = express.Router();

usersRouter.use("/getitems/:amount", itemsController.getItems);
usersRouter.use("/create", itemsController.addItems);
usersRouter.use("/delete/:id", itemsController.deleteItem);
usersRouter.use("/rating", itemsController.rating);

export default usersRouter;
