const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ptime', 
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pdataId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pdata',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'ptime',
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
        name: "fk_ptime_pdata1_idx",
        using: "BTREE",
        fields: [
          { name: "pdataId" },
        ]
      },
    ]
  });
};
