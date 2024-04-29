const { Statuses } = require("../bookshop_models/");

exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await Statuses.findAll();

    const responseBody = statuses.map((status) => ({
      StatusID: status.StatusID,
      StatusName: status.StatusName,
      Description: status.Description,
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

exports.getStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Getting Status with ID: ${id}`);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid Status ID.",
      });
    }

    const status = await Statuses.findByPk(id);

    if (!status) {
      return res.status(404).json({
        error: "Status not found.",
      });
    }

    res.status(200).json(status);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createStatus = async (req, res) => {
  try {
    console.log("Creating a new status");
    console.log(req.body);
    const { StatusName, Description } = req.body;
    if (!StatusName) {
      return res.status(400).json({
        error: "StatusName is required",
      });
    }

    const newStatus = await Statuses.create({
      StatusName,
      Description,
    });

    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const statusId = req.params.id;
    console.log(statusId);
    const status = await Statuses.findByPk(statusId);

    await status.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const statusId = req.params.id;
    const { StatusName, Description } = req.body;

    const status = await Statuses.findByPk(statusId);

    status.StatusName = StatusName;
    status.Description = Description;

    await status.save();

    return res.status(200).json(status);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
