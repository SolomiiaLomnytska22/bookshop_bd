const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('PublisherAddresses', {
    AddressID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PublisherID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Publishers',
        key: 'PublisherID'
      }
    },
    Country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    City: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ZIPCode: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PublisherAddresses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PublisherAddresses_pkey",
        unique: true,
        fields: [
          { name: "AddressID" },
        ]
      },
    ]
  });
