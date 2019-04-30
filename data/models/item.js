import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  picture: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  tags: { type: String, required: true },
  rating: { type: Array, required: true },
  averageRating: { type: Number, required: true }
});

const Item = mongoose.model("Item", itemSchema);

const userSchema = new Schema({
  administration: { type: Boolean, required: true },
  deleteAccountRequest: { type: Boolean, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);
