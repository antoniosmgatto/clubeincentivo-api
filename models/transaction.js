const uuid = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['CASHBACK', 'WITHDRAWN']],
        },
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      guid: {
        type: DataTypes.UUIDV1,
        allowNull: false,
        unique: {
          args: true,
          msg: 'guid already in use.',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      transactionable: DataTypes.STRING,
      transactionableId: {
        type: DataTypes.INTEGER,
        field: 'transactionable_id',
      },
      customerId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'transactions',
      hooks: {
        // eslint-disable-next-line no-unused-vars
        beforeValidate: (transaction, options) => {
          if (transaction.id == null) {
            transaction.guid = uuid();
          }
        },
      },
    },
  );
  // eslint-disable-next-line func-names
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Customer, { as: 'customer' });
    Transaction.belongsTo(models.Company, { as: 'company' });
    Transaction.belongsTo(models.Sale, { foreignKey: 'transactionble_id', constraints: false, as: 'sales' });
  };

  return Transaction;
};
