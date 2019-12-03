const { ProductModel } = require("../models/product");
const { TagModel } = require("../models/tag");
const { UserModel } = require("../models/user");
const { RatingModel } = require("../models/rating");
const { RoleModel } = require("../models/role");

const initModels = (sequelize, Sequelize) => {
  const Product = ProductModel(sequelize, Sequelize);
  const Tag = TagModel(sequelize, Sequelize);
  const User = UserModel(sequelize, Sequelize);
  const Rating = RatingModel(sequelize, Sequelize);
  const Role = RoleModel(sequelize, Sequelize);

  return { Product, Tag, User, Rating, Role };
};
module.exports = { initModels };
