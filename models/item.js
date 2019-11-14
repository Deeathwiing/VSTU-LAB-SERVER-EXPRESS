import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  picture: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String },
  tags: { type: String },
  rating: { type: Array },
  averageRating: { type: Number }
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
