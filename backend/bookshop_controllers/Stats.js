const sequelize = require("../config/db.js");
const { QueryTypes } = require("sequelize");

exports.getCountryStats = async (req, res) => {
  try {
    const results = await sequelize.query(`SELECT * FROM get_order_counts_by_country()`, {
      type: QueryTypes.SELECT,
    });
    console.log(results)
    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};