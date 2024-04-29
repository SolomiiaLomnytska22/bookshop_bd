const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define('StorageBooks', {
    StorageBookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ISBN: {
      type: DataTypes.STRING(13),
      allowNull: false,
      references: {
        model: 'Books',
        key: 'ISBN'
      }
    },
    AvailableQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NextDeliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    UnitPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'StorageBooks',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "StorageBooks_pkey",
        unique: true,
        fields: [
          { name: "StorageBookID" },
        ]
      },
    ]
  });
