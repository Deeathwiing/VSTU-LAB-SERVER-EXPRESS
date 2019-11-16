import Item from "../../models/item.js";

export const createItem = data => {
  const item = new Item({
    picture: data.picture,
    title: data.title,
    description: data.description,
    price: data.price,
    tags: data.tags,
    rating: data.rating,
    averageRating: data.averageRating,
    amount: data.amount,
    lastUpdate: Date.now()
  });
  return item.save();
};
