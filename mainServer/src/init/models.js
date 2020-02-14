const ProductModel = require("../models/product");
const TagModel = require("../models/tag");
const UserModel = require("../models/user");
const RatingModel = require("../models/rating");
const RoleModel = require("../models/role");

class Models {
  Product = ProductModel;
  Tag = TagModel;
  User = UserModel;
  Rating = RatingModel;
  Role = RoleModel;
}
module.exports = new Models();
