import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, required: true },
  administration: { type: Boolean, required: true },
  deleteAccountRequest: { type: Boolean, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);
