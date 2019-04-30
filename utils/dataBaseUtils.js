import mongoose from "mongoose";
import "../data/models/item";

const Item = mongoose.model("Item");
const User = mongoose.model("User");

export const setUpConnection = () => {
  mongoose.connect("mongodb://localhost/OMVapeShop");
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
  return Item.findById(id).remove();
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
