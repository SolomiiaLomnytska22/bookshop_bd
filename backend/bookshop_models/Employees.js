const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('Employees', {
    EmployeeID: {
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
    PositionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Positions',
        key: 'PositionID'
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
    Email: {
      type: DataTypes.STRING(320),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Employees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Employees_pkey",
        unique: true,
        fields: [
          { name: "EmployeeID" },
        ]
      },
    ]
  });
