const sequelize = require("../init/sequelize"),
  Sequelize = require("sequelize");

const RatingModel = sequelize.define("rating", {
  ratingValue: {
    type: Sequelize.INTEGER
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: "uniqueTag"
  },

  productId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: "uniqueTag"
  }
});

module.exports = RatingModel;
