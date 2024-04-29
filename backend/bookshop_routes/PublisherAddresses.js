const express = require("express");
const router = express.Router();
const publisherAddressesController = require("../bookshop_controllers/PublisherAdresses.js");

router.route("/").get(publisherAddressesController.getAllPublisherAddresses).post(publisherAddressesController.createPublisherAddress);

router
  .route("/:id")
  //.get(publisherAddressesController.getPublisherAddressByID)
  .delete(publisherAddressesController.deletePublisherAddress)
  .put(publisherAddressesController.updatePublisherAddress);

module.exports = router;
