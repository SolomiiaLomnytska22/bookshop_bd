const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('Authors', {
    AuthorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    FirstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Authors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Authors_pkey",
        unique: true,
        fields: [
          { name: "AuthorID" },
        ]
      },
    ]
  });

