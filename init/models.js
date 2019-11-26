import { ProductModel } from "../models/product";
import { TagModel } from "../models/tag";
import { UserModel } from "../models/user";
import { RatingModel } from "../models/rating";
import { RoleModel } from "../models/role";

export let initModels = (sequelize, Sequelize) => {
  const Product = ProductModel(sequelize, Sequelize);
  const Tag = TagModel(sequelize, Sequelize);
  const User = UserModel(sequelize, Sequelize);
  const Rating = RatingModel(sequelize, Sequelize);
  const Role = RoleModel(sequelize, Sequelize);

  return { Product, Tag, User, Rating, Role };
};
