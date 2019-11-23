import { createItem } from "../services/itemsServices/createItem.js";
import { listItems } from "../services/itemsServices/getItems.js";
import { removeItem } from "../services/itemsServices/deleteItem.js";
import { addRating } from "../services/itemsServices/rating.js";
import { updateItemService } from "../services/itemsServices/updateItemService.js";

export function getItems(req, res) {
  listItems(req.params.amount).then(data => {
    res.send(data);
  });
}
export function addItem(req, res) {
  createItem(req.body).then(data => res.send(data));
}

export function updateItem(req, res) {
  updateItemService(req.body).then(data => res.send(data));
}

export function deleteItem(req, res) {
  removeItem(req.params.id).then(data => res.sendStatus(data));
}
export function rating(req, res) {
  addRating(req).then(data => res.send(data));
}
