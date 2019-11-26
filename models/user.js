import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  administration: { type: Boolean, required: true },
  deleteAccountRequest: { type: Boolean, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true }
});

export const User = mongoose.model("User", userSchema);

export const UserModel = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deleteAccountRequest: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return User;
};
