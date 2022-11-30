const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  friends = sequelize.define('friends', 
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'player',
        key: 'id'
      }
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'player',
        key: 'id'
      }
    }
  }, 
  {
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
        name: "playerId",
        using: "BTREE",
        fields: [
          { name: "playerId" },
        ]
      },
      {
        name: "friendId",
        using: "BTREE",
        fields: [
          { name: "friendId" },
        ]
      }
    ]
  });
  friends.associate = (models) => {
    friends.belongsTo(models.player, {foreignkey: 'friendId', as: 'friend'})
};
  return friends;
}
