const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define('Positions', {
    PositionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PositionName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    HourlyRate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    PermissionLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Positions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Positions_pkey",
        unique: true,
        fields: [
          { name: "PositionID" },
        ]
      },
    ]
  });