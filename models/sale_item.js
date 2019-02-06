
module.exports = (sequelize, DataTypes) => {
  const SaleItem = sequelize.define('SaleItem', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    saleId: {
      type: DataTypes.INTEGER,
      field: 'sale_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    freezeTableName: true,
    tableName: 'sale_items',
    defaultScope: {
      attributes: ['id', 'code', 'description', 'quantity', 'price', 'saleId', 'createdAt', 'updatedAt'],
    },
  });
  // eslint-disable-next-line func-names
  SaleItem.associate = function (models) {
    SaleItem.belongsTo(models.Sale, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return SaleItem;
};
