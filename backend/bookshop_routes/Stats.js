const express = require("express");
const router = express.Router();
const statsController = require("../bookshop_controllers/Stats.js");

router.route("/countries/").get(statsController.getCountryStats);

module.exports = router;
