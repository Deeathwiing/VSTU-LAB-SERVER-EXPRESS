import { models } from "../init/dataBaseUtils";

const createProduct = data => {
  return models.Product.createProduct(data);
};

const removeProduct = id => {
  return models.Product.deleteProduct(id);
};

const listProducts = async amount => {
  let products = await models.Product.findAllPagination(amount);
  return products;
};

const addRating = req => {
  return models.Rating.addRating(req);
};

const updateProductService = data => {
  return models.Product.updateProduct(data);
};

export {
  updateProductService,
  addRating,
  listProducts,
  removeProduct,
  createProduct
};
