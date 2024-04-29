const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('Reviews', {
    ReviewID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    BookID: {
      type: DataTypes.STRING(13),
      allowNull: false,
      references: {
        model: 'Books',
        key: 'ISBN'
      }
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'CustomerID'
      }
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ReviewBody: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Reviews',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Reviews_pkey",
        unique: true,
        fields: [
          { name: "ReviewID" },
        ]
      },
    ]
  });
