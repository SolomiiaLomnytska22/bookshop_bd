const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define('UserLogins', {
    LoginID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PasswordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    RefreshToken: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserLogins',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "UserLogins_pkey",
        unique: true,
        fields: [
          { name: "LoginID" },
        ]
      },
    ]
  });