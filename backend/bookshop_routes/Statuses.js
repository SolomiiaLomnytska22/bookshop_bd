const express = require("express");
const router = express.Router();
const statusesController = require("../bookshop_controllers/Statuses.js");

router.route("/").get(statusesController.getAllStatuses).post(statusesController.createStatus);

router
  .route("/:id")
  .get(statusesController.getStatusById)
  .delete(statusesController.deleteStatus)
  .put(statusesController.updateStatus);

module.exports = router;
