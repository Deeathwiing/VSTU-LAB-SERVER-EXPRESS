const Product = require("../services/products");

class ProductsController {
  getProducts = (req, res) => {
    Product.listProducts(req.params.amount).then(data => {
      res.send(data);
    });
  };
  addProduct = (req, res) => {
    Product.createProduct(req.body).then(data => res.send(data));
  };

  updateProduct = (req, res) => {
    Product.updateProductService(req.body).then(data => res.send(data));
  };

  deleteProduct = (req, res) => {
    Product.removeProduct(req.params.id).then(data => res.sendStatus(data));
  };
  rating = (req, res) => {
    Product.addRating(req).then(data => res.send(data));
  };
}
module.exports = new ProductsController();
