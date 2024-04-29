const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('CustomerAddresses', {
    AddressID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'CustomerID'
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
    tableName: 'CustomerAddresses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "CustomerAddresses_pkey",
        unique: true,
        fields: [
          { name: "AddressID" },
        ]
      },
    ]
  });

