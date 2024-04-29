const { OrderItems } = require("../bookshop_models/");

exports.getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItems.findAll();

    const responseBody = orderItems.map((orderItem) => ({
      OrderItemID: orderItem.OrderItemID,
      OrderID: orderItem.OrderID,
      StorageBookID: orderItem.StorageBookID,
      Quantity: orderItem.Quantity,
      TotalItemPrice: orderItem.TotalItemPrice,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      body: {
        status: "error",
        message: "Internal Server Error",
      },
    });
  }
};

exports.getOrderItemsByOrderID = async (req, res) => {
  try {
    const orderItems = await OrderItems.findAll({where: {
      OrderID: req.params.id
    }});

    const responseBody = orderItems.map((orderItem) => ({
      OrderItemID: orderItem.OrderItemID,
      OrderID: orderItem.OrderID,
      StorageBookID: orderItem.StorageBookID,
      Quantity: orderItem.Quantity,
      TotalItemPrice: orderItem.TotalItemPrice,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      body: {
        status: "error",
        message: "Internal Server Error",
      },
    });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    console.log("Creating a new order item");
    console.log(req.body);
    const { OrderID, StorageBookID, Quantity, TotalItemPrice } = req.body;
    console.log(req.body)
    if (!OrderID || !StorageBookID || !Quantity ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newOrderItem = await OrderItems.create({
      OrderID,
      StorageBookID,
      Quantity,
      TotalItemPrice,
    });

    res.status(201).json(newOrderItem);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItemId = req.params.id;
    console.log(orderItemId);
    const orderItem = await OrderItems.findByPk(orderItemId);

    await orderItem.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const orderItemId = req.params.id;
    const { OrderID, StorageBookID, Quantity, TotalItemPrice } = req.body;

    const orderItem = await OrderItems.findByPk(orderItemId);

    orderItem.OrderID = OrderID;
    orderItem.StorageBookID = StorageBookID;
    orderItem.Quantity = Quantity;
    orderItem.TotalItemPrice = TotalItemPrice;

    await orderItem.save();

    return res.status(200).json(orderItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
