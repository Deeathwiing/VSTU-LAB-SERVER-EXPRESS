import mongoose from "mongoose";
import "../data/models/item";
import "../data/models/user";
import config from "../etc/config.json";

const Item = mongoose.model("Item");
const User = mongoose.model("User");

export const setUpConnection = () => {
  mongoose.connect(
    `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
  );
};

export const listItems = () => {
  return Item.find();
};

export function createItem(data) {
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
}

export const deleteItem = id => {
  return Item.findByIdAndDelete(id);
};

export const addRating = async data => {
  Item.findById(data.itemId).then(foundItem => {
    const { user } = data;
    const personalRating = {
      user: user.logEmail,
      ratingValue: data.ratingValue
    };
    const singleRating = foundItem.rating;

    let checkRating = false;
    if (singleRating[0]) {
      singleRating.forEach((element, i, rating) => {
        if (element.user === user.logEmail) {
          rating[i] = personalRating;
          checkRating = true;
        }
      });
      if (!checkRating) {
        singleRating.push(personalRating);
      }
    } else singleRating.push(personalRating);

    foundItem.rating = singleRating;

    const ratingValueArr = foundItem.rating.map(element =>
      Number(element.ratingValue)
    );

    // eslint-disable-next-line max-len
    const nextAverageRating =
      ratingValueArr.reduce((sum, current) => sum + current) /
      ratingValueArr.length;

    foundItem.averageRating = Math.round(nextAverageRating);

    return Item.updateOne(
      { _id: data.itemId },
      { rating: foundItem.rating, averageRating: foundItem.averageRating }
    );
  });
};

export const listUsers = () => {
  return User.find();
};

export function createUser(data) {
  const user = new User({
    administration: data.administration,
    deleteAccountRequest: data.deleteAccountRequest,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password
  });
  return user.save();
}

export const deleteUser = id => {
  return User.findById(id).remove();
};
