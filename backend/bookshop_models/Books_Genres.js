const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('Books_Genres', {
    Books_ISBN: {
      type: DataTypes.STRING(13),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Books',
        key: 'ISBN'
      }
    },
    Genres_GenreID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Genres',
        key: 'GenreID'
      }
    }
  }, {
    sequelize,
    tableName: 'Books_Genres',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Books_Genres_pkey",
        unique: true,
        fields: [
          { name: "Books_ISBN" },
          { name: "Genres_GenreID" },
        ]
      },
    ]
  });
