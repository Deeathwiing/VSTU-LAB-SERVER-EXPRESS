const express = require("express");
const productsController = require("../controllers/products.js");
const {
  authenticationMiddleware,
  authenticationAdminMiddleware
} = require("../middlewares/auth");

const productsRouter = express.Router();

productsRouter.use("/getitems/:amount", productsController.getProducts);
productsRouter.use(
  "/create",
  authenticationAdminMiddleware,
  productsController.addProduct
);
productsRouter.use(
  "/update",
  authenticationAdminMiddleware,
  productsController.updateProduct
);
productsRouter.use(
  "/delete/:id",
  authenticationAdminMiddleware,
  productsController.deleteProduct
);
productsRouter.use(
  "/rating",
  authenticationMiddleware,
  productsController.rating
);

module.exports = productsRouter;
