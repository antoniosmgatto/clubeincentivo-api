'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleItem = sequelize.define('SaleItem', {
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    saleId: {
      type: DataTypes.INTEGER,
      field: "sale_id"
    }
  }, {
      freezeTableName: true,
      tableName: "sale_items",
      version: false
    });
  SaleItem.associate = function(models) {
    SaleItem.belongsTo(models.Sale)
  };
  return SaleItem;
};