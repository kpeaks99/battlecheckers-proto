const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  userStats = sequelize.define('userStats', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'userFriends',
        key: 'playerId'
      }
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    losts: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    draw: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "playerId"
    }
  }, {
    sequelize,
    tableName: 'userStats',
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
        unique: true,
        using: "BTREE",
        fields: [
          { name: "playerId" },
        ]
      },
    ]
  });  
  userStats.associate = (models) => {
    userStats.belongsTo(models.userTable, {foreignkey: 'playerId'})
  }
  return userStats;
};
