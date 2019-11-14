import Item from "../../models/item";

export const removeItem = id => {
  return Item.findByIdAndDelete(id)
    .then(() => 201)
    .catch(() => 409);
};
