const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports =  sequelize.define('Books_Authors', {
    Books_ISBN: {
      type: DataTypes.STRING(13),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Books',
        key: 'ISBN'
      }
    },
    Authors_AuthorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Authors',
        key: 'AuthorID'
      }
    }
  }, {
    sequelize,
    tableName: 'Books_Authors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Books_Authors_pkey",
        unique: true,
        fields: [
          { name: "Books_ISBN" },
          { name: "Authors_AuthorID" },
        ]
      },
    ]
  });
