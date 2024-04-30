const Log = require("../logger_models/Log.js");

const logHandler = async (method, username, origin, url) => {
  try {
    await Log.create({
      method: method,
      username: username,
      origin: origin,
      url: url,
    });
  } catch (err) {
    console.error("Error logging event to MongoDB", err);
  }
};

const logger = (req, res, next) => {
  logHandler(req.method, req.username, req.headers.origin, req.url);
  next();
};

module.exports = { logger, logHandler };
