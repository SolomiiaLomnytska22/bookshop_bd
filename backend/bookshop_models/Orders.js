const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define('Orders', {
    OrderID: {
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
    PostServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PostServices',
        key: 'PostServiceID'
      }
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Statuses',
        key: 'StatusID'
      }
    },
    CreationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    FinalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Orders_pkey",
        unique: true,
        fields: [
          { name: "OrderID" },
        ]
      },
    ]
  });
