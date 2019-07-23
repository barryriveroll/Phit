const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

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
  username: {
    type: String,
    max: 20,
    min: 2,
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  aboutBlurb: {
    type: String,
    maxlength: 240,
    default: "No about information provided",
    trim: true
  },
  socialInstagram: {
    type: String,
    maxlength: 240,
    trim: true
  },
  socialFacebook: {
    type: String,
    maxlength: 240,
    trim: true
  },
  socialTwitter: {
    type: String,
    maxlength: 240,
    trim: true
  },
  socialYouTube: {
    type: String,
    maxlength: 240,
    trim: true
  },
  shareAllMeals: { type: Boolean, default: false },
  shareAllWorkouts: { type: Boolean, default: false }
});

const User = mongoose.model(
  "User",
  userSchema.plugin(uniqueValidator, { message: "Username already in use" })
);

module.exports = User;
