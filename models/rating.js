export const RatingModel = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
    ratingValue: {
      type: Sequelize.INTEGER
    }
  });
  return Rating;
};
