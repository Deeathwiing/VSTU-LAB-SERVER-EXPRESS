import { models } from "../../init/dataBaseUtils";

export const createProduct = data => {
  return models.Product.createProduct(data);
};
