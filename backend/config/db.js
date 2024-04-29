const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgresql://postgres:1111@localhost:5432/BookShop");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the database!");
  } catch (error) {
    console.error(`Got error while connecting to the database: ${error}.`);
  }
})();

module.exports = sequelize;
