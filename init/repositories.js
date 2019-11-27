import { initProductRep } from "../repository/productRep";
import { initUserRep } from "../repository/userRep";
import { initRatingRep } from "../repository/ratingRep";

export const initRep = (models, sequelize) => {
  initProductRep(models, sequelize);
  initUserRep(models);
  initRatingRep(models);
};
