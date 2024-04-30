const { Orders, OrderItems } = require("../bookshop_models/");

exports.getAllOrdersByUserID = async (req, res) => {
  try {
    const orders = await Orders.findAll({where: {CustomerID: req.params.id}});

    const responseBody = orders.map((order) => {
      return {
      OrderID: order.OrderID,
      CustomerID: order.CustomerID,
      PostServiceID: order.PostServiceID,
      Status: order.Status,
      CreationDate: order.CreationDate,
      Comment: order.Comment,
      FinalPrice: order.FinalPrice,
    }
  });

  
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

exports.getOrderByID = async (req, res) => {
  try {
    const orders = await Orders.findByPk(req.params.id);

    res.status(200).json(orders);
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

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();

    const responseBody = orders.map((order) => ({
      OrderID: order.OrderID,
      CustomerID: order.CustomerID,
      PostServiceID: order.PostServiceID,
      Status: order.Status,
      CreationDate: order.CreationDate,
      Comment: order.Comment,
      FinalPrice: order.FinalPrice,
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

exports.createOrder = async (req, res) => {
  try {
    console.log("Creating a new order");
    console.log(req.body);
    const { CustomerID, PostServiceID, Status, CreationDate, Comment, FinalPrice } = req.body;
    if (!CustomerID || !PostServiceID || !Status || !CreationDate) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newOrder = await Orders.create({
      CustomerID,
      PostServiceID,
      Status,
      CreationDate,
      Comment,
      FinalPrice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    const order = await Orders.findByPk(orderId);

    await order.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { CustomerID, PostServiceID, Status, CreationDate, Comment, FinalPrice } = req.body;

    const order = await Orders.findByPk(orderId);

    order.CustomerID = CustomerID;
    order.PostServiceID = PostServiceID;
    order.Status = Status;
    order.CreationDate = CreationDate;
    order.Comment = Comment;
    order.FinalPrice = FinalPrice;

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
