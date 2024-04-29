const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define('PostServices', {
    PostServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    StandardFee: {
      type: DataTypes.DECIMAL,
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
    tableName: 'PostServices',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PostServices_pkey",
        unique: true,
        fields: [
          { name: "PostServiceID" },
        ]
      },
    ]
  });
