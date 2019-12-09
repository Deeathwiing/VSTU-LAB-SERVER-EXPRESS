const { initProductRep } = require("../repository/productRep");
const { initUserRep } = require("../repository/userRep");
const { initRatingRep } = require("../repository/ratingRep");
const models = require("./models");
const sequelize = require("./sequelize");

const initRep = () => {
  initProductRep(models, sequelize);
  initUserRep(models, sequelize);
  initRatingRep(models);
};
module.exports = { initRep };
