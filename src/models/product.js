const sequelize = require("../init/sequelize");
const Sequelize = require("sequelize");

const ProductModel = sequelize.define("product", {
  price: {
    type: Sequelize.FLOAT
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.BLOB
  }
});

module.exports = ProductModel;
