import { initProductRep } from "../repository/productRep";
import { initUserRep } from "../repository/userRep";
import { initRatingRep } from "../repository/ratingRep";

export const initRep = models => {
  initProductRep(models);
  initUserRep(models);
  initRatingRep(models);
};
