import Item from "../../models/item.js";

export const updateItemService = data => {
  if (data.picture) {
    return Item.updateOne(
      { _id: data.id },
      {
        $set: {
          picture: data.picture,
          title: data.title,
          description: data.description,
          price: data.price,
          tags: data.tags,
          amount: data.amount,
          lastUpdate: Date.now()
        }
      },
      { upsert: false }
    );
  } else
    return Item.updateOne(
      { _id: data.id },
      {
        $set: {
          title: data.title,
          description: data.description,
          price: data.price,
          tags: data.tags,
          amount: data.amount,
          lastUpdate: Date.now()
        }
      },
      { upsert: false }
    );
};
