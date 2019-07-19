const router = require("express").Router();
const reportController = require("../../controllers/reportController");

// "/api/meals/find/:id"
router.route("/submit").post(reportController.submitReport);

module.exports = router;
