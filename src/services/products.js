const ProductRep = require("../repository/productRep");
const RatingRep = require("../repository/ratingRep");
class Product {
  createProduct = data => {
    return ProductRep.createProduct(data);
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
module.exports = new Product();
