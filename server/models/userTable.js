const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  userTable = sequelize.define('userTable', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    userTable.hasOne(models.userStat, {foreignKey: 'playerStatId', as: 'playerStat'}), //Whatever the alias is sequelize will append 'id'
    userTable.hasMany(models.userFriends, {foreignKey: 'friendId', sourceKey: 'id', as: 'friend'}) //This creates a friendId in userFriends
    userTable.hasMany(models.userFriends, {foreignKey: 'playerId', sourceKey: 'id', as: 'player'}) //This creates a playerId in userFriends
  };
  return userTable;
};
