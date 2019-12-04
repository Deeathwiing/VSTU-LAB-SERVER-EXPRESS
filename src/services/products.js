const { models } = require("../init/dataBaseUtils");

const createProduct = data => {
  return models.Product.createProduct(data);
};

const removeProduct = id => {
  return models.Product.deleteProduct(id);
};

const listProducts = amount => {
  let products = models.Product.findAllPagination(amount);
  return products;
};

const addRating = req => {
  return models.Rating.addRating(req);
};

const updateProductService = data => {
  return models.Product.updateProduct(data);
};

module.exports = {
  updateProductService,
  addRating,
  listProducts,
  removeProduct,
  createProduct
};