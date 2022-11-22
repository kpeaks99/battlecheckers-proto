const Sequelize = require('sequelize');
const player = require('./player');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pdata', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    losts: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    draw: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'player',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pdata',
    timestamps: false,
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
        name: "player_id",
        using: "BTREE",
        fields: [
          { name: "player_id" },
        ]
      },
    ]
  });
};

