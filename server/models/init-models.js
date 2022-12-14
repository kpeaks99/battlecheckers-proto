var DataTypes = require("sequelize").DataTypes;
var _boardState = require("./boardState");
var _userFriends = require("./userFriends");
var _userStat = require("./userStat");
var _userTable = require("./userTable");

function initModels(sequelize) {
  var boardState = _boardState(sequelize, DataTypes);
  var userFriends = _userFriends(sequelize, DataTypes);
  var userStat = _userStat(sequelize, DataTypes);
  var userTable = _userTable(sequelize, DataTypes);

  //Associations for friends
  userFriends.belongsTo(userTable, { as: "player", foreignKey: "playerId"});
  userTable.hasMany(userFriends, { as: "player", foreignKey: "playerId"});

  userFriends.belongsTo(userTable, { as: "friend", foreignKey: "friendId"});
   userTable.hasMany(userFriends, { as: "friend", foreignKey: "friendId"});

  // Associates one player (userTable) to one stats(userStats)
  userStat.belongsTo(userTable, { as: "playerStat", foreignKey: "playerStatId"});
  userTable.hasOne(userStat, { as: "playerStat", foreignKey: "playerStatId"});
  
  boardState.belongsTo(userTable, { as: "playerOne", foreignKey: "playerOneId"});
  userTable.hasOne(boardState, { as: "boardState", foreignKey: "playerOneId"});
  
  boardState.belongsTo(userTable, { as: "playerTwo", foreignKey: "playerTwoId"});
  userTable.hasOne(boardState, { as: "playerTwo_boardState", foreignKey: "playerTwoId"});

  return {
    boardState,
    userFriends,
    userStat,
    userTable,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
