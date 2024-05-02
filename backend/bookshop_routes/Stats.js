const express = require("express");
const router = express.Router();
const statsController = require("../bookshop_controllers/Stats.js");

router.route("/countries/").get(statsController.getCountryStats);
router.route("/books/").get(statsController.getTop5Books);
router.route("/order/").get(statsController.getOrders);
module.exports = router;
