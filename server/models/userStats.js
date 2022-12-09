const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  userStats = sequelize.define('userStats', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    playerStatsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "playerStatsId"
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
        name: "playerStatsId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "playerStatsId" },
        ]
      },
    ]
  });  
  userStats.associate = (models) => {
    userStats.belongsTo(models.userTable, {foreignkey: 'playerId', as: 'playerStats'})
  }
  return userStats;
};
