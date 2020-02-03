const express = require("express"),
  ProductsController = require("../controllers/products"),
  {
    authenticationAdminMiddleware,
    authenticationMiddleware
  } = require("../middlewares/auth"),
  path = require("path"),
  multer = require("multer"),
  uuidv4 = require("uuid/v4"),
  CustomError = require("../init/customError");

const DIR = "./static/productImages";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, uuidv4() + "-" + fileName);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new CustomError(
          "notImage",
          404,
          "Only .png, .jpg and .jpeg format allowed!"
        )
      );
    }
  }
});

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
