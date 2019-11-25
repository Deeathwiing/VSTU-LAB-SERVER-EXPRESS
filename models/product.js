export const ProductModel = (sequelize, Sequelize) => {
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
      type: Sequelize.BOOLEAN
    },
    picture: {
      type: Sequelize.BLOB
    }
  });
  return Product;
};
