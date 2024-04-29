const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define('Books', {
    ISBN: {
      type: DataTypes.STRING(13),
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Language: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Pages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PublicationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    PublisherID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Publishers',
        key: 'PublisherID'
      }
    },
    CoverImageURL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Books',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Books_pkey",
        unique: true,
        fields: [
          { name: "ISBN" },
        ]
      }
    ]
  });
