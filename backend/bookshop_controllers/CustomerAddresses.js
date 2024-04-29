const { CustomerAddresses } = require("../bookshop_models/");

exports.getAllCustomerAddresses = async (req, res) => {
  try {
    const customerAddresses = await CustomerAddresses.findAll();

    const responseBody = customerAddresses.map((address) => ({
      AddressID: address.AddressID,
      CustomerID: address.CustomerID,
      Country: address.Country,
      City: address.City,
      Address: address.Address,
      ZIPCode: address.ZIPCode
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

exports.getCustomerAddressByCustomerID = async (req, res) => {
  try {
    const customerId = req.params.id;
    console.log(`Getting address with ID: ${customerId}`);

    if (isNaN(customerId)) {
      return res.status(400).json({
        error: "Invalid address ID.",
      });
    }

    const customerAddress = await CustomerAddresses.findOne({where: {CustomerID: customerId}});

    if (!customerAddress) {
      return res.status(404).json({
        error: "Address not found.",
      });
    }
    const responseBody = customerAddress

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createCustomerAddress = async (req, res) => {
  try {
    console.log("Creating a new customer address");
    console.log(req.body);
    const { CustomerID, Country, City, Address, ZIPCode } = req.body;
    if (!CustomerID || !Country || !City || !Address || !ZIPCode) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newAddress = await CustomerAddresses.create({
      CustomerID,
      Country,
      City,
      Address,
      ZIPCode
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteCustomerAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    console.log(addressId);
    const address = await CustomerAddresses.findByPk(addressId);

    await address.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCustomerAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { CustomerID, Country, City, Address, ZIPCode } = req.body;

    const address = await CustomerAddresses.findByPk(addressId);

    address.CustomerID = CustomerID;
    address.Country = Country;
    address.City = City;
    address.Address = Address;
    address.ZIPCode = ZIPCode;

    await address.save();

    return res.status(200).json(address);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
