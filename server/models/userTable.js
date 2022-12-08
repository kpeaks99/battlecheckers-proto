const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  userTable = sequelize.define('userTable', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'userStats',
        key: 'playerStatsId'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'userTable',
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
    ]
  });

  userTable.associate = (models) => {
    //Whatever the alias (as:) is sequelize will append 'id'
    //This will create a new column on the table if no column exist.
    userTable.hasOne(models.userStats, {foreignkey: 'id', as: 'playerStats'}), //Whatever the alias is sequelize will append 'id'
    userTable.hasMany(models.userFriends, {foreignkey: 'friendId', as: 'friend'})
    userTable.hasMany(models.userFriends, {foreignkey: 'playerId', as: 'player'})
  };
  return userTable;
};
