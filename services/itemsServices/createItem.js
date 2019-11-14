import Item from "../../models/item";

export const createItem = data => {
  const item = new Item({
    picture: data.picture,
    title: data.title,
    description: data.description,
    price: data.price,
    tags: data.tags,
    rating: data.rating,
    averageRating: data.averageRating
  });
  return item.save();
};
