const Product = require("../services/products");

class ProductsController {
  getProducts = async (req, res, next) => {
    console.log(
      req.query.amount,
      req.query.withImg,
      req.query.sortByName,
      req.query.sortByDate,
      req.query.page
    );
    try {
      let products = await Product.listProducts(
        req.query.amount,
        req.query.withImg,
        req.query.sortByName,
        req.query.sortByDate,
        req.query.page
      );

      res.status(201).send(products);
    } catch (e) {
      next(e);
    }
  };

  addProduct = (req, res, next) => {
    //console.log("Files Controller: " + req.file);
    //console.log("Body Controller: " + req.body);

    Product.createProduct(req.body, req.file, req.protocol, req.get("host"))
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  updateProduct = (req, res, next) => {
    Product.updateProductService(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  deleteProduct = (req, res, next) => {
    Product.removeProduct(req.query.id)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  rating = (req, res, next) => {
    Product.addRating(req)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };
}
module.exports = new ProductsController();
