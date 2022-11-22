var DataTypes = require("sequelize").DataTypes;
var _friends = require("./friends");
var _pdata = require("./pdata");
var _player = require("./player");
var _ptime = require("./ptime");

function initModels(sequelize) {
  var friends = _friends(sequelize, DataTypes);
  var pdata = _pdata(sequelize, DataTypes);
  var player = _player(sequelize, DataTypes);
  var ptime = _ptime(sequelize, DataTypes);

  ptime.belongsTo(pdata, { as: "pdatum", foreignKey: "pdata_id"});
  pdata.hasMany(ptime, { as: "ptimes", foreignKey: "pdata_id"});
  friends.belongsTo(player, { as: "player", foreignKey: "player_id"});
  player.hasMany(friends, { as: "friends", foreignKey: "player_id"});
  pdata.belongsTo(player, { as: "player", foreignKey: "player_id"});
  player.hasMany(pdata, { as: "pdata", foreignKey: "player_id"});

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
