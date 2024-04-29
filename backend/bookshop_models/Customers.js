const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('Customers', {
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    LoginID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserLogins',
        key: 'LoginID'
      }
    },
    FirstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(320),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Customers_pkey",
        unique: true,
        fields: [
          { name: "CustomerID" },
        ]
      },
    ]
  });
