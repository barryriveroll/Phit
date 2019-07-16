const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkOut" }],
  topPanel: { type: String, default: "nutrition" },
  theme: { type: String },
  darkMode: { type: Boolean, default: true },
  xlFit: { type: Boolean, default: false },
  xlNut: { type: Boolean, default: false },
  picture: { type: String, default: "https://i.imgur.com/1vwfqhE.jpg" },
  username: { type: String, max: 20, min: 3, trim: true, unique: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
