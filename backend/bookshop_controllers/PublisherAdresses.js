const { PublisherAddresses } = require("../bookshop_models/");

exports.getAllPublisherAddresses = async (req, res) => {
  try {
    const publisherAddresses = await PublisherAddresses.findAll();

    const responseBody = publisherAddresses.map((address) => ({
      AddressID: address.AddressID,
      PublisherID: address.PublisherID,
      Country: address.Country,
      City: address.City,
      Address: address.Address,
      ZIPCode: address.ZIPCode,
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

exports.createPublisherAddress = async (req, res) => {
  try {
    console.log("Creating a new publisher address");
    console.log(req.body);
    const { PublisherID, Country, City, Address, ZIPCode } = req.body;
    if (!PublisherID || !Country || !City || !Address || !ZIPCode) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newPublisherAddress = await PublisherAddresses.create({
      PublisherID,
      Country,
      City,
      Address,
      ZIPCode,
    });

    res.status(201).json(newPublisherAddress);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deletePublisherAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    console.log(addressId);
    const address = await PublisherAddresses.findByPk(addressId);

    await address.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePublisherAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { PublisherID, Country, City, Address, ZIPCode } = req.body;

    const address = await PublisherAddresses.findByPk(addressId);

    address.PublisherID = PublisherID;
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
