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
productsRouter
  .get("/getProducts", ProductsController.getProducts)
  .post(
    "/create",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    ProductsController.addProduct
  )
  .put(
    "/update",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    ProductsController.updateProduct
  )
  .delete(
    "/delete",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    ProductsController.deleteProduct
  )
  .put("/rating", authenticationMiddleware, ProductsController.rating);

module.exports = productsRouter;
