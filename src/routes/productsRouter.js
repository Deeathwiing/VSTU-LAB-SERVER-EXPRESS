const express = require("express");
const ProductsController = require("../controllers/products");
const {
  authenticationAdminMiddleware,
  authenticationMiddleware
} = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const productsRouter = express.Router();

productsRouter
  .get("/getProducts", ProductsController.getProducts)
  .post(
    "/create",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    upload.single("picture"),
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
