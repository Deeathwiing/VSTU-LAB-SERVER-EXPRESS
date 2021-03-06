const models = require("./models");

const initRelations = () => {
  models.Product.belongsToMany(models.Tag, { through: "ProductTag" });

  models.Tag.belongsToMany(models.Product, { through: "ProductTag" });

  models.User.belongsToMany(models.Role, { through: "UserRoles" });

  models.Role.belongsToMany(models.User, { through: "UserRoles" });

  models.User.hasMany(models.Rating);

  models.Product.hasMany(models.Rating);

  models.Rating.belongsTo(models.Product);

  models.Rating.belongsTo(models.User);
};
module.exports = { initRelations };
