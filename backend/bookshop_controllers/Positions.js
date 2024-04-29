const { Positions } = require("../bookshop_models/");

exports.getAllPositions = async (req, res) => {
  try {
    const positions = await Positions.findAll();

    const responseBody = positions.map((position) => ({
      PositionID: position.PositionID,
      PositionName: position.PositionName,
      HourlyRate: position.HourlyRate,
      PermissionLevel: position.PermissionLevel,
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

exports.createPosition = async (req, res) => {
  try {
    console.log("Creating a new position");
    console.log(req.body);
    const { PositionName, HourlyRate, PermissionLevel } = req.body;
    if (!PositionName || !HourlyRate || !PermissionLevel) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newPosition = await Positions.create({
      PositionName,
      HourlyRate,
      PermissionLevel,
    });

    res.status(201).json(newPosition);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const positionId = req.params.id;
    console.log(positionId);
    const position = await Positions.findByPk(positionId);

    await position.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const positionId = req.params.id;
    const { PositionName, HourlyRate, PermissionLevel } = req.body;

    const position = await Positions.findByPk(positionId);

    position.PositionName = PositionName;
    position.HourlyRate = HourlyRate;
    position.PermissionLevel = PermissionLevel;

    await position.save();

    return res.status(200).json(position);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
