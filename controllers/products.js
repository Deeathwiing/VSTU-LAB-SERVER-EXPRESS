const {
  createProduct,
  listProducts,
  removeProduct,
  addRating,
  updateProductService
} = require("../services/products");

function getProducts(req, res) {
  listProducts(req.params.amount).then(data => {
    res.send(data);
  });
}
function addProduct(req, res) {
  createProduct(req.body).then(data => res.send(data));
}

function updateProduct(req, res) {
  updateProductService(req.body).then(data => res.send(data));
}

function deleteProduct(req, res) {
  removeProduct(req.params.id).then(data => res.sendStatus(data));
}
function rating(req, res) {
  addRating(req).then(data => res.send(data));
}

module.exports = {
  rating,
  deleteProduct,
  updateProduct,
  addProduct,
  getProducts
};
