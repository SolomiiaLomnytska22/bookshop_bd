const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define('Statuses', {
    StatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    StatusName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Statuses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Statuses_pkey",
        unique: true,
        fields: [
          { name: "StatusID" },
        ]
      },
    ]
  });
