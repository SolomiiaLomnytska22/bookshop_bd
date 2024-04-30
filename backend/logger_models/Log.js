const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  dateTime: { type: Date, default: Date.now },
  method: String,
  username: String,
  origin: String,
  url: String,
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
