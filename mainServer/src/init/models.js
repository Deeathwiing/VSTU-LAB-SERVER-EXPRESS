const ProductModel = require("../models/product"),
  TagModel = require("../models/tag"),
  UserModel = require("../models/user"),
  RatingModel = require("../models/rating"),
  RoleModel = require("../models/role");

class Models {
  Product = ProductModel;

  Tag = TagModel;

  User = UserModel;

  Rating = RatingModel;

  Role = RoleModel;
}
module.exports = new Models();
