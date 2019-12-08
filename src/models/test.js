const sequelize = require("../init/sequelize");
console.log(sequelize);
const Sequelize = require("sequelize");
const Rating322 = sequelize.define("rating", {
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

module.exports = Rating322;
