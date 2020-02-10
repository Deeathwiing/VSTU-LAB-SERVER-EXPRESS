const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logScheme = new Schema({
  message: { type: String, required: true },
  ratingAmount: { type: Date, required: true }
});

const Log = mongoose.model("Log", logScheme);

module.exports = Log;
