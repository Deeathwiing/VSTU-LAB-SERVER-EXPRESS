const { models } = require("../init/dataBaseUtils");

class Product {
  createProduct = data => {
    return models.Product.createProduct(data);
  };

  removeProduct = id => {
    return models.Product.deleteProduct(id);
  };

  listProducts = amount => {
    let products = models.Product.findAllPagination(amount);
    return products;
  };

  addRating = req => {
    return models.Rating.addRating(req);
  };

  updateProductService = data => {
    return models.Product.updateProduct(data);
  };
}
module.exports = new Product();
