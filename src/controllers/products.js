const Product = require("../services/products");

class ProductsController {
  getProducts = (req, res, next) => {
    Product.listProducts(req.query.amount, req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => next(err));
  };

  addProduct = (req, res, next) => {
    Product.createProduct(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  updateProduct = (req, res, next) => {
    Product.updateProductService(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  };

  deleteProduct = (req, res, next) => {
    Product.removeProduct(req.params.id)
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
