var DataTypes = require("sequelize").DataTypes;
var _friends = require("./Friends");
var _pdata = require("./Pdata");
var _player = require("./Player");
var _ptime = require("./Ptime");

function initModels(sequelize) {
  var friends = _friends(sequelize, DataTypes);
  var pdata = _pdata(sequelize, DataTypes);
  var player = _player(sequelize, DataTypes);
  var ptime = _ptime(sequelize, DataTypes);

  ptime.belongsTo(pdata, { as: "ptimes", foreignKey: "pdataId"});
  pdata.hasMany(ptime, { as: "ptimes", foreignKey: "pdataId"});

  friends.belongsTo(player, { as: "player", foreignKey: "playerId"});
  player.hasMany(friends, { as: "player", foreignKey: "playerId"});
  
  friends.belongsTo(player, { as: "friendData", foreignKey: "friendId"});
  player.hasMany(friends, { as: "friendData", foreignKey: "friendId"});
  
  pdata.belongsTo(player, { as: "pdata", foreignKey: "playerId"});
  player.hasMany(pdata, { as: "pdata", foreignKey: "playerId"});

  return {
    friends,
    pdata,
    player,
    ptime,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
