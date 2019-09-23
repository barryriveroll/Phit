import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import addReactNDevTools from "reactn-devtools";
import App from "./App";

addReactNDevTools();

setGlobal({
  username: "",
  nutritionReady: false,
  exerciseReady: false,
  emailVerified: false,
  userId: "",
  firebaseUser: {},
  globalTags: [
    "Fat Burning",
    "Muscle Building",
    "Toning",
    "Resistance & Cardio"
  ],
  resistanceTags: [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Legs",
    "Core",
    "Full Body"
  ],
  cardioTags: ["High Intensity", "Low Impact", "Endurance", "Interval"],
  sharedResistanceWeightProgress: [],
  currentWeight: 0,
  goalWeight: 0,
  ft: 0,
  in: 0,
  gender: ""
});

render(<App />, document.getElementById("root"));
