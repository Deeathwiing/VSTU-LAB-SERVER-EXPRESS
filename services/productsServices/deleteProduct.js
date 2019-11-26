import { models } from "../../init/dataBaseUtils";

export const removeProduct = id => {
  return models.Product.deleteProduct(id);
};
