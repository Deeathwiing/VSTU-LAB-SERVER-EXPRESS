import mongoose from "mongoose";
import "../data/models/item";
import "../data/models/user";
import "../data/models/authUser";

import config from "../etc/config.json";

const Item = mongoose.model("Item");
const User = mongoose.model("User");
const AuthUser = mongoose.model("AuthUser");

export const setUpConnection = () => {
  mongoose.connect(
    `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
  );
};

export const listItems = amount => {
  let skip = Number(amount);
  let limit = 15;
  let sort = { skip, limit };
  return Item.find({}, null, sort, null);
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

export const deleteItem = async id => {
  return Item.findByIdAndDelete(id)
    .then(() => 201)
    .catch(() => 409);
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
  return User.find({ email: data.email }).then(data => {
    if (data == false) {
      return user.save().then(() => 201);
    }
    return 409;
  });
}

export const deleteUser = async id => {
  return User.findByIdAndDelete(id)
    .then(() => 201)
    .catch(() => 409);
};

export const removeRequest = async user => {
  return User.updateOne(
    { email: user.logEmail },
    { deleteAccountRequest: true }
  )
    .then(() => 201)
    .catch(() => 409);
};

export const editNames = async data => {
  return User.updateOne(
    { email: data.user.logEmail },
    { firstName: data.firstName, lastName: data.lastName }
  )
    .then(() => 201)
    .catch(() => 409);
};
export const authorization = async data => {
  User.find().then(users => {
    const checkLogin = users.some(
      user => data.logEmail === user.email && data.logPass === user.password
    );
    const admin = users.some(
      user =>
        data.logEmail === user.email &&
        data.logPass === user.password &&
        user.administration
    );
    const authUser = new AuthUser({
      admin,
      checkLogin,
      logEmail: data.logEmail
    });
    return authUser.save();
  });
};

export const getAuthUser = async () => {
  return AuthUser.find()
    .then(user => {
      return {
        status: 201,
        admin: user[0].admin,
        logEmail: user[0].logEmail,
        checkLogin: user[0].checkLogin
      };
    })
    .catch(() => {
      status: 401;
    });
};
