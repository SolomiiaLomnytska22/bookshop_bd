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

exports.getTop5Books = async (req, res) => {
  try {
    const results = await sequelize.query(`SELECT * FROM get_top_5_books_sold()`, {
      type: QueryTypes.SELECT,
    });
    console.log(results)
    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const results = await sequelize.query(`SELECT * FROM calculate_order_quantities('${req.query.start_date}','${req.query.end_date}')`, {
      type: QueryTypes.SELECT,
    });
    console.log(results)
    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};