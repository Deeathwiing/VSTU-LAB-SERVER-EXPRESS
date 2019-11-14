import Item from "../../models/item";

export const listItems = amount => {
  let skip = Number(amount);
  let limit = 15;
  let sort = { skip, limit };
  return Item.find({}, null, sort, null);
};
