const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  userStat = sequelize.define('userStat', {
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
    playerStatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "playerStatId"
    }
  }, {
    sequelize,
    tableName: 'userStat',
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
        name: "playerStatId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "playerStatId" },
        ]
      },
    ]
  });  
  userStat.associate = (models) => {
    userStat.belongsTo(models.userTable, {foreignKey: 'playerStatId', as: 'playerStat'})
  }
  return userStat;
};
