const { Publishers } = require("../bookshop_models/");

exports.getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publishers.findAll();

    const responseBody = publishers.map((publisher) => ({
      PublisherID: publisher.PublisherID,
      PublisherName: publisher.PublisherName,
      PhoneNumber: publisher.PhoneNumber,
      Email: publisher.Email,
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

exports.getPublisherById = async (req, res) => {
  try {
    const publishers = await Publishers.findByPk(req.params.id);
    res.status(200).json(publishers);
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

exports.createPublisher = async (req, res) => {
  try {
    console.log("Creating a new publisher");
    console.log(req.body);
    const { PublisherName, PhoneNumber, Email } = req.body;
    if (!PublisherName) {
      return res.status(400).json({
        error: "PublisherName is required",
      });
    }

    const newPublisher = await Publishers.create({
      PublisherName,
      PhoneNumber,
      Email,
    });

    res.status(201).json(newPublisher);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deletePublisher = async (req, res) => {
  try {
    const publisherId = req.params.id;
    console.log(publisherId);
    const publisher = await Publishers.findByPk(publisherId);

    await publisher.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePublisher = async (req, res) => {
  try {
    const publisherId = req.params.id;
    const { PublisherName, PhoneNumber, Email } = req.body;

    const publisher = await Publishers.findByPk(publisherId);

    publisher.PublisherName = PublisherName;
    publisher.PhoneNumber = PhoneNumber;
    publisher.Email = Email;

    await publisher.save();

    return res.status(200).json(publisher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
