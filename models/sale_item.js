'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleItem = sequelize.define('SaleItem', {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    saleId: {
      type: DataTypes.INTEGER,
      field: "sale_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at"
    }
  }, {
      freezeTableName: true,
      tableName: "sale_items",
      version: false
    });
  SaleItem.associate = function(models) {
    SaleItem.belongsTo(models.Sale, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };
  return SaleItem;
};