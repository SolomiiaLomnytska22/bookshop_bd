const express = require("express");
const router = express.Router();
const publishersController = require("../bookshop_controllers/Publishers.js");

router.route("/").get(publishersController.getAllPublishers).post(publishersController.createPublisher);

router
  .route("/:id")
  //.get(publishersController.getPublisherByID)
  .delete(publishersController.deletePublisher)
  .put(publishersController.updatePublisher);

module.exports = router;
