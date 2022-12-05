const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  boardState = sequelize.define('boardState', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    playerOneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'userTable',
        key: 'id'
      },
      unique: "boardState_ibfk_1"
    },
    playerTwoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'userTable',
        key: 'id'
      },
      unique: "boardState_ibfk_2"
    },
    boardState: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    redTurn: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    redUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blackUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'boardState',
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
        name: "playerOneId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "playerOneId" },
        ]
      },
      {
        name: "playerTwoId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "playerTwoId" },
        ]
      },
      {
        name: "redUserId",
        using: "BTREE",
        fields: [
          { name: "redUserId" },
        ]
      },
      {
        name: "blackUserId",
        using: "BTREE",
        fields: [
          { name: "blackUserId" },
        ]
      },
    ]
  });
  return boardState;
};
