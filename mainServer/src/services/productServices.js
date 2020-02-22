const ProductRep = require("../repository/productRepository"),
  RatingRep = require("../repository/ratingRepository");

class ProductServices {
  createProduct = (data, image, protocol, host) => {
    return ProductRep.createProduct(data, image, protocol, host);
  };

  removeProduct = id => {
    return ProductRep.deleteProduct(id);
  };

  listProducts = async (
    amount,
    withImg,
    sortByName,
    sortByDate,
    page,
    title
  ) => {
    return ProductRep.findAllPagination(
      amount,
      withImg,
      sortByName,
      sortByDate,
      page,
      title
    );
  };

  addRating = req => {
    return RatingRep.addRating(req);
  };

  updateProductService = (data, image, protocol, host) => {
    return ProductRep.updateProduct(data, image, protocol, host);
  };
}
module.exports = new ProductServices();
