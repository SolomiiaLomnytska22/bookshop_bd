const { Customers, UserLogins } = require("../bookshop_models/");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.findAll();

    const responseBody = customers.map((customer) => ({
      CustomerID: customer.CustomerID,
      LoginID: customer.LoginID,
      FirstName: customer.FirstName,
      LastName: customer.LastName,
      PhoneNumber: customer.PhoneNumber,
      Email: customer.Email
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

exports.getCustomerByID = async (req, res) => {
  try {
    const customerId = req.params.id;
    console.log(`Getting customer with ID: ${customerId}`);

    if (isNaN(customerId)) {
      return res.status(400).json({
        error: "Invalid customer ID.",
      });
    }

    const customers = await Customers.findByPk(customerId);

    if (!customers) {
      return res.status(404).json({
        error: "Customer not found.",
      });
    }
    const responseBody = customers;

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getCustomerByUsername = async (req, res) => {
  try {
    const login = await UserLogins.findOne({where: {Username : req.params.username}});
    if (!login) {
      return res.status(400).json({
        error: "Invalid Username.",
      });
    }
    const loginId = login.LoginID
    console.log(`Getting customer with Login ID: ${loginId}`);

    const customer = await Customers.findOne({where: {LoginID : loginId}});

    if (!customer) {
      return res.status(404).json({
        error: "Customer not found.",
      });
    }

    const responseBody = customer

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

exports.createCustomer = async (req, res) => {
  try {
    console.log("Creating a new customer");
    console.log(req.body);
    const { LoginID, FirstName, LastName, PhoneNumber, Email } = req.body;
    if (!LoginID || !FirstName || !LastName || !PhoneNumber) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newCustomer = await Customers.create({
      LoginID,
      FirstName,
      LastName,
      PhoneNumber,
      Email
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    console.log(customerId);
    const customer = await Customers.findByPk(customerId);

    await customer.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { LoginID, FirstName, LastName, PhoneNumber, Email } = req.body;

    const customer = await Customers.findByPk(customerId);

    customer.LoginID = LoginID;
    customer.FirstName = FirstName;
    customer.LastName = LastName;
    customer.PhoneNumber = PhoneNumber;
    customer.Email = Email;

    await customer.save();

    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
