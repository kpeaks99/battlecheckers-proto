const Sequelize = require('sequelize');
const player = require('./Player');
module.exports = function(sequelize, DataTypes) {
  pdata = sequelize.define('pdata', {
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
    playerId: {
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
        name: "playerId",
        using: "BTREE",
        fields: [
          { name: "playerId" },
        ]
      },
    ]
  } );

  pdata.associate = (models) => {
      pdata.belongsTo(models.player, {foreignkey: 'playerId'})
  };
  return pdata;
};

