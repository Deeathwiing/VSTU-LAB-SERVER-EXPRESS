import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthUserSchema = new Schema({
  admin: { type: Boolean, required: true },
  checkLogin: { type: Boolean, required: true },
  logEmail: { type: String, required: true }
});

const AuthUser = mongoose.model("AuthUser", AuthUserSchema);
