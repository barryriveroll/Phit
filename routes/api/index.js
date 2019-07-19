const router = require("express").Router();
const mealRoutes = require("./meal");
const workouts = require("./workouts");
const user = require("./user");
const report = require("./report");

// Book routes
router.use("/meals", mealRoutes);
router.use("/users", user);
router.use("/workouts", workouts);
router.use("/report", report);

module.exports = router;
