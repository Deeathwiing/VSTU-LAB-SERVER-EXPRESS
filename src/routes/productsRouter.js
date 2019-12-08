const express = require("express");
const ProductsController = require("../controllers/products");
const Auth = require("../middlewares/auth");

const productsRouter = express.Router();

productsRouter.use("/getitems/:amount", ProductsController.getProducts);
productsRouter.use(
  "/create",
  Auth.authenticationMiddleware,
  Auth.authenticationAdminMiddleware,
  ProductsController.addProduct
);
productsRouter.use(
  "/update",
  Auth.authenticationMiddleware,
  Auth.authenticationAdminMiddleware,
  ProductsController.updateProduct
);
productsRouter.use(
  "/delete/:id",
  Auth.authenticationMiddleware,
  Auth.authenticationAdminMiddleware,
  ProductsController.deleteProduct
);
productsRouter.use(
  "/rating",
  Auth.authenticationMiddleware,
  ProductsController.rating
);

module.exports = productsRouter;
