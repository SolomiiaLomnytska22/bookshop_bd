const express = require("express");
const router = express.Router();
const positionsController = require("../bookshop_controllers/Positions.js");

router.route("/").get(positionsController.getAllPositions).post(positionsController.createPosition);

router
  .route("/:id")
  //.get(positionsController.getPositionByID)
  .delete(positionsController.deletePosition)
  .put(positionsController.updatePosition);

module.exports = router;
