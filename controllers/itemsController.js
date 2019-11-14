import { createItem } from "../services/itemsServices/createItem";
import { listItems } from "../services/itemsServices/getItems";
import { removeItem } from "../services/itemsServices/deleteItem";
import { addRating } from "../services/itemsServices/rating";

export function getItems(req, res) {
  listItems(req.params.amount).then(data => {
    res.send(data);
  });
}
export function addItems(req, res) {
  createItem(req.body).then(data => res.send(data));
}
export function deleteItem(req, res) {
  removeItem(req.params.id).then(data => res.send(data));
}
export function rating(req, res) {
  addRating(req.body).then(data => res.send(data));
}
