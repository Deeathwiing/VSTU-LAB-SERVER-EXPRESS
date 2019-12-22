const express = require("express");
const ProductsController = require("../controllers/products");
const {
  authenticationAdminMiddleware,
  authenticationMiddleware
} = require("../middlewares/auth");

const productsRouter = express.Router();

// productsRouter
//   .get(ProductsController.getProducts)
//   .post(
//     authenticationMiddleware,
//     authenticationAdminMiddleware,
//     ProductsController.addProduct
//   )
//   .patch(
//     authenticationMiddleware,
//     authenticationAdminMiddleware,
//     ProductsController.updateProduct
//   )
//   .delete(
//     authenticationMiddleware,
//     authenticationAdminMiddleware,
//     ProductsController.deleteProduct
//   );
productsRouter.use("/getProducts", ProductsController.getProducts);
productsRouter.use(
  "/create",
  authenticationMiddleware,
  authenticationAdminMiddleware,
  ProductsController.addProduct
);
productsRouter.use(
  "/update",
  authenticationMiddleware,
  authenticationAdminMiddleware,
  ProductsController.updateProduct
);
productsRouter.use(
  "/delete",
  authenticationMiddleware,
  authenticationAdminMiddleware,
  ProductsController.deleteProduct
);
productsRouter.use(
  "/rating",
  authenticationMiddleware,
  ProductsController.rating
);

module.exports = productsRouter;
