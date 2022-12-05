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
        key: 'playerId'
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
    userTable.hasOne(models.userStats, {foreignkey: 'id'}),
    userTable.hasMany(models.userFriends, {foreignkey: 'friendId'})
  };
  return userTable;
};
