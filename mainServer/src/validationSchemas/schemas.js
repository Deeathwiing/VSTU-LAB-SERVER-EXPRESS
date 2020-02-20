const login = require("./auth/loginSchema"),
  registration = require("./auth/registrationSchema"),
  createProduct = require("./products/createProductSchema"),
  updateProduct = require("./products/updateProductSchema"),
  rating = require("./products/updateRatingSchema"),
  updateProfile = require("./users/updateProfileSchema"),
  getProducts = require("./products/getProductsSchema"),
  checkId = require("./checkIdSchema"),
  getUsers = require("./users/getUsersSchema"),
  image = require("./products/imageSchema"),
  changePassword = require("./users/changePasswordSchema");

module.exports = {
  login,
  registration,
  createProduct,
  updateProduct,
  rating,
  updateProfile,
  getProducts,
  checkId,
  getUsers,
  image,
  changePassword
};
