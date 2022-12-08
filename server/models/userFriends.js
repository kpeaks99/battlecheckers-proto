const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  userFriends = sequelize.define('userFriends', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'userFriends',
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
      },
    ]
  });
  userFriends.associate = (models) => {
    userFriends.belongsTo(models.userTable, {foreignkey: 'friendId', as: 'friend'})
    userFriends.belongsTo(models.userTable, {foreignkey: 'playerId', as: 'player'})
  }
  return userFriends;
};
