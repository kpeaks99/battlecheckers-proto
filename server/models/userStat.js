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
  userStat.associate = (models) => {    //Whatever the alias is sequelize will append 'id'
    userStat.belongsTo(models.userTable, {foreignKey: 'playerStatId', as: 'playerStat'}) //creates a playerStatId in userStat
  }
  return userStat;
};
