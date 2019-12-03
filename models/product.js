const ProductModel = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
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
  return Product;
};
module.exports = { ProductModel };
