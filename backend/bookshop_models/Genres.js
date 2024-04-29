const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('Genres', {
    GenreID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Genres',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Genres_pkey",
        unique: true,
        fields: [
          { name: "GenreID" },
        ]
      },
    ]
  });
