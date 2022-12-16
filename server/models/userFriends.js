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
      references: { // Onlly affects structure of db not data
        model: 'userTable',
        key: 'id',
        as: 'player'
      }
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // Onlly affects structure of db not data
        model: 'userTable',
        key: 'id',
        as: 'friend'
      }
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
     //target key directs to the targeted model's column
     // in this case foreignkey -> id
    userFriends.belongsTo(models.userTable, {foreignKey: 'friendId', targetKey: 'id', as: 'friend'})  //This creates a friendId in userFriends
    userFriends.belongsTo(models.userTable, {foreignKey: 'playerId', targetKey: 'id', as: 'player'})   //This creates a playerId in userFriends
  }
  return userFriends;
};
