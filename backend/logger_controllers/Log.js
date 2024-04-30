const Log = require("../logger_models/Log");

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getLogsByDate = async (req, res) => {
  const { fromDate, toDate } = req.query;

  try {
    const logs = await Log.find({
      dateTime: { $gte: new Date(fromDate), $lte: new Date(toDate) },
    });
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
