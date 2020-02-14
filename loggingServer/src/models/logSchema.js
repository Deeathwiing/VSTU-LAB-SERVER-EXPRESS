const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logScheme = new Schema({
  date: { type: String, required: true },
  message: { type: String, required: true }
});

const Log = mongoose.model("Log", logScheme);
const Error = mongoose.model("Error", logScheme);

module.exports = { Log, Error };
