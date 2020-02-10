const ProductRep = require("../repository/productRepository");
const RatingRep = require("../repository/ratingRepository");

class ProductServices {
  createProduct = (data, image, protocol, host) => {
    return ProductRep.createProduct(data, image, protocol, host);
  };

  removeProduct = id => {
    return ProductRep.deleteProduct(id);
  };

  listProducts = async (amount, withImg, sortByName, sortByDate, page) => {
    return ProductRep.findAllPagination(
      amount,
      withImg,
      sortByName,
      sortByDate,
      page
    );
  };

  addRating = req => {
    return RatingRep.addRating(req);
  };

  updateProductService = data => {
    return ProductRep.updateProduct(data);
  };
}
module.exports = new ProductServices();
