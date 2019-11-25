export const initRelations = models => {
  models.Product.belongsToMany(models.Tag, { through: "ProductTag" });
  models.Product.hasMany(models.Rating);
  models.User.belongsToMany(models.Role, { through: "UserRoles" });
  models.User.hasMany(models.Rating);
};
