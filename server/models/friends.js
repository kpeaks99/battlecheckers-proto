const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friends', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    player_friend_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'player',
        key: 'id'
      }
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'player',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'friends',
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
        name: "player_id",
        using: "BTREE",
        fields: [
          { name: "player_id" },
        ]
      },
      {
        name: "player_Friend_id",
        using: "BTREE",
        fields: [
          { name: "player_id" },
        ]
      }
    ]
  });
};
