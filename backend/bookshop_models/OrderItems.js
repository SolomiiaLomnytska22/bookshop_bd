const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('OrderItems', {
    OrderItemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'OrderID'
      }
    },
    StorageBookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'StorageBooks',
        key: 'StorageBookID'
      }
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TotalItemPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OrderItems',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "OrderItems_pkey",
        unique: true,
        fields: [
          { name: "OrderItemID" },
        ]
      },
    ]
  });

