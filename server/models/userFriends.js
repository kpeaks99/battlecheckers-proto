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
      allowNull: false,
      references: {
        model: 'userFriends',
        key: 'friendId'
      }
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
        name: "id",
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
  }
  return userFriends;
};
