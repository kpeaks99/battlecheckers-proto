const Sequelize = require('sequelize');
const pdata = require('./pdata');
module.exports = function(sequelize, DataTypes) {

  return sequelize.define('player', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    player_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "player_name_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    status: {
      type: DataTypes.ENUM('online','offline','in_game','in_lobby'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'player',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "player_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "player_name" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      }
    ]
  })

};
