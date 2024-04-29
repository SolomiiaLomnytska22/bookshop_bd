const express = require("express");
const router = express.Router();
const customerAddressesController = require("../bookshop_controllers/CustomerAddresses.js");

router.route("/").get(customerAddressesController.getAllCustomerAddresses).post(customerAddressesController.createCustomerAddress);

router
  .route("/:id")
  .get(customerAddressesController.getCustomerAddressByCustomerID)
  .delete(customerAddressesController.deleteCustomerAddress)
  .put(customerAddressesController.updateCustomerAddress);

module.exports = router;
