import { models } from "../../init/dataBaseUtils";

export const updateProductService = data => {
  return models.Product.updateProduct(data);
};
