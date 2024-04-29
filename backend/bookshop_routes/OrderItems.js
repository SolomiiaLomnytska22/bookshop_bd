const express = require("express");
const router = express.Router();
const orderItemsController = require("../bookshop_controllers/OrderItems.js");

router.route("/").get(orderItemsController.getAllOrderItems).post(orderItemsController.createOrderItem);

router
  .route("/:id")
  .delete(orderItemsController.deleteOrderItem)
  .put(orderItemsController.updateOrderItem);

router
  .route('/order/:id')
  .get(orderItemsController.getOrderItemsByOrderID)

module.exports = router;
