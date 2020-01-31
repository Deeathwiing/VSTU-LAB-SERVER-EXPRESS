const express = require("express");
const ProductsController = require("../controllers/products");
const {
  authenticationAdminMiddleware,
  authenticationMiddleware
} = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./static/productImages/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single("picture");

const productsRouter = express.Router();

productsRouter
  .get("/getProducts", ProductsController.getProducts)
  .post(
    "/create",
    authenticationMiddleware,
    authenticationAdminMiddleware,
    upload,
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
