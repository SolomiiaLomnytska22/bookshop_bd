const express = require("express");
const router = express.Router();
const logsController = require("../logger_controllers/Log.js");

router.route("/").get(logsController.getAllLogs); // Отримати всі записи логів
router.route("/byDate").get(logsController.getLogsByDate); // Отримати записи логів за датою

module.exports = router;
