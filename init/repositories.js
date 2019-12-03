const { initProductRep } = require("../repository/productRep");
const { initUserRep } = require("../repository/userRep");
const { initRatingRep } = require("../repository/ratingRep");

const initRep = (models, sequelize) => {
  initProductRep(models, sequelize);
  initUserRep(models, sequelize);
  initRatingRep(models);
};
module.exports = { initRep };
