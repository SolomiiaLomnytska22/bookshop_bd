const express = require("express");
const router = express.Router();
const customersController = require("../bookshop_controllers/Customers.js");

router.route("/").get(customersController.getAllCustomers).post(customersController.createCustomer);

router
  .route("/:id")
  .get(customersController.getCustomerByID)
  .delete(customersController.deleteCustomer)
  .put(customersController.updateCustomer);

router
  .route("/login/:username")
  .get(customersController.getCustomerByUsername)

module.exports = router;
