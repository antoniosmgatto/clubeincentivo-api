const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      cfeId: {
        type: DataTypes.STRING,
        field: 'cfe_id',
        allowNull: false,
        unique: 'company_cfe_id_unique',
      },
      purchaseDate: {
        type: DataTypes.DATE,
        field: 'purchase_date',
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      cashback: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      cashbackDate: {
        type: DataTypes.DATE,
        field: 'cashback_date',
        allowNull: false,
      },
      onBalance: {
        type: DataTypes.BOOLEAN,
        field: 'on_balance',
        defaultValue: false,
      },
      clientDocument: {
        type: DataTypes.STRING,
        field: 'client_document',
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      customerId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        allowNull: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false,
        unique: 'company_cfe_id_unique',
      },
    },
    {
      freezeTableName: true,
      tableName: 'sales',
      version: true,
      hooks: {
        // eslint-disable-next-line no-unused-vars
        beforeValidate: (sale, options) => {
          if (sale.onBalance === false) {
            sale.cashback = sale.total * 0.1; // only 10% for now
            sale.cashbackDate = moment().day(7); // cashback only after 7 days for now
          }
        },
      },
      defaultScope: {
        attributes: [
          'id',
          'cfeId',
          'purchaseDate',
          'total',
          'cashback',
          'cashbackDate',
          'onBalance',
          'createdAt',
          'updatedAt',
          'version',
        ],
      },
    },
  );
  // eslint-disable-next-line func-names
  Sale.associate = function (models) {
    Sale.belongsTo(models.Company, { as: 'company' });
    Sale.belongsTo(models.Customer, { as: 'customer' });
    Sale.hasMany(models.SaleItem, { as: 'items', onDelete: 'cascade' });
  };
  return Sale;
};
