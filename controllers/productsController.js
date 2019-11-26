import { createProduct } from "../services/ProductsServices/createProduct.js";
import { listProducts } from "../services/ProductsServices/getProducts.js";
import { removeProduct } from "../services/ProductsServices/deleteProduct.js";
import { addRating } from "../services/ProductsServices/rating.js";
import { updateProductService } from "../services/ProductsServices/updateProductService.js";

export function getProducts(req, res) {
  listProducts(req.params.amount).then(data => {
    res.send(data);
  });
}
export function addProduct(req, res) {
  createProduct(req.body).then(data => res.send(data));
}

export function updateProduct(req, res) {
  updateProductService(req.body).then(data => res.send(data));
}

export function deleteProduct(req, res) {
  removeProduct(req.params.id).then(data => res.sendStatus(data));
}
export function rating(req, res) {
  addRating(req).then(data => res.send(data));
}
