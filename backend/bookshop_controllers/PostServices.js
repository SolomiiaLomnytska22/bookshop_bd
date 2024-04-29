const { PostServices } = require("../bookshop_models/");

exports.getAllPostServices = async (req, res) => {
  try {
    const postServices = await PostServices.findAll();

    const responseBody = postServices.map((service) => ({
      PostServiceID: service.PostServiceID,
      Name: service.Name,
      StandardFee: service.StandardFee,
      PhoneNumber: service.PhoneNumber,
      Email: service.Email,
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

exports.getPostServiceById = async (req, res) => {
  try {
    const genreId = req.params.id;
    console.log(`Getting PostService with ID: ${genreId}`);

    if (isNaN(genreId)) {
      return res.status(400).json({
        error: "Invalid PostService ID.",
      });
    }

    const genre = await PostServices.findByPk(genreId);

    if (!genre) {
      return res.status(404).json({
        error: "PostService not found.",
      });
    }

    res.status(200).json(genre);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createPostService = async (req, res) => {
  try {
    console.log("Creating a new post service");
    console.log(req.body);
    const { Name, StandardFee, PhoneNumber, Email } = req.body;
    if (!Name || !StandardFee) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newPostService = await PostServices.create({
      Name,
      StandardFee,
      PhoneNumber,
      Email,
    });

    res.status(201).json(newPostService);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deletePostService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    console.log(serviceId);
    const service = await PostServices.findByPk(serviceId);

    await service.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePostService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { Name, StandardFee, PhoneNumber, Email } = req.body;

    const service = await PostServices.findByPk(serviceId);

    service.Name = Name;
    service.StandardFee = StandardFee;
    service.PhoneNumber = PhoneNumber;
    service.Email = Email;

    await service.save();

    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
