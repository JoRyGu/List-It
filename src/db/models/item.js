'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'List',
        key: 'id',
        as: 'listId'
      }
    }
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'CASCADE'
    });
  };
  return Item;
};