import { models, sequelize } from "../../init/dataBaseUtils";

export const listProducts = async amount => {
  let products = await models.Product.findAllPagination(amount);
  return products;
};

/* 
attributes: {
      include: [
        [
          { model: models.Rating, as: "Ratings" },
          sequelize.fn("Count", sequelize.col("Ratings.productId")),
          "ratingAmount"
        ]
      ]
    }
*/
