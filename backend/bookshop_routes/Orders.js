const express = require("express");
const router = express.Router();
const ordersController = require("../bookshop_controllers/Orders.js");

router.route("/").get(ordersController.getAllOrders).post(ordersController.createOrder);

router
  .route("/:id")
  .get(ordersController.getOrderByID)
  .delete(ordersController.deleteOrder)
  .put(ordersController.updateOrder);

router
  .route("/customer/:id")
  .get(ordersController.getAllOrdersByUserID)

module.exports = router;
