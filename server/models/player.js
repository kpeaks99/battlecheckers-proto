
const Sequelize = require('sequelize');
const initModels = require('./init-models');

module.exports = function(sequelize, DataTypes) {
  
  player = sequelize.define('player', 
  {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
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
  }, 
  {
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
    
  });

  player.associate = (models) => {
    player.hasOne(models.pdata, {foreignkey: 'id'}),
    player.hasMany(models.friends, {foreignkey: 'friendId'})
  };

  return player;
}

