const RatingModel = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
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
  return Rating;
};
module.exports = { RatingModel };
