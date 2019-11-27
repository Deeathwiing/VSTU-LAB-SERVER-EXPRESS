import express from "express";
import * as productsController from "../controllers/products.js";
import {
  authenticationMiddleware as checkAuth,
  authenticationAdminMiddleware as checkAdmin
} from "../middlewares/passportMiddleWares";

const productsRouter = express.Router();

productsRouter.use("/getitems/:amount", productsController.getProducts);
productsRouter.use("/create", checkAdmin, productsController.addProduct);
productsRouter.use("/update", checkAdmin, productsController.updateProduct);
productsRouter.use("/delete/:id", checkAdmin, productsController.deleteProduct);
productsRouter.use("/rating", checkAuth, productsController.rating);

export default productsRouter;
