const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define('Publishers', {
    PublisherID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PublisherName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(320),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Publishers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Publishers_pkey",
        unique: true,
        fields: [
          { name: "PublisherID" },
        ]
      },
    ]
  });
